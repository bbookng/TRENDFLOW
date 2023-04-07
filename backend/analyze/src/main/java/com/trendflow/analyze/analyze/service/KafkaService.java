package com.trendflow.analyze.analyze.service;

import org.apache.kafka.clients.consumer.OffsetAndMetadata;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.TopicPartition;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Properties;
import java.time.Duration;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.analyze.analyze.dto.vo.Payload;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaService {
	private final String bootstrapServers = "cluster.p.ssafy.io:9092";
	private final String youtubeUrlTopic = "youtube_url";
	private final String youtubeAnalyzeTopic = "youtube_analyze";

	// Kafka producer 설정
	private KafkaProducer<String, String> createKafkaProducer() {
		Properties props = new Properties();
		props.put("bootstrap.servers", bootstrapServers);
		props.put("acks", "all");
		props.put("retries", 0);
		props.put("batch.size", 16384);
		props.put("linger.ms", 1);
		props.put("buffer.memory", 33554432);
		props.put("key.serializer", StringSerializer.class.getName());
		props.put("value.serializer", StringSerializer.class.getName());
		return new KafkaProducer<>(props);
	}

	// Kafka consumer 설정
	private KafkaConsumer<String, String> createKafkaConsumer() {
		Properties props = new Properties();
		props.put(ConsumerConfig.MAX_POLL_INTERVAL_MS_CONFIG, 600000);
		props.put(ConsumerConfig.REQUEST_TIMEOUT_MS_CONFIG, 300000);
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		props.put(ConsumerConfig.GROUP_ID_CONFIG, "my-group-id");
		props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");

		KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
		consumer.subscribe(Collections.singletonList(youtubeAnalyzeTopic));
		return consumer;
	}

	public void sendYoutubeUrl(String url) {
		try (KafkaProducer<String, String> kafkaProducer = createKafkaProducer()) {
			ProducerRecord<String, String> record = new ProducerRecord<>(youtubeUrlTopic, url);
			RecordMetadata metadata = kafkaProducer.send(record).get();

			System.out.printf("Produced record (key=%s, value=%s) meta(partition=%d, offset=%d)%n",
				record.key(), record.value(), metadata.partition(), metadata.offset());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Payload consumeYoutubeAnalyze() {
		try (KafkaConsumer<String, String> kafkaConsumer = createKafkaConsumer()) {
			while (true) {
				ConsumerRecords<String, String> records = kafkaConsumer.poll(Duration.ofMillis(100));
				for (ConsumerRecord<String, String> record : records) {
					String value = record.value();
					System.out.printf("Received record (key=%s, value=%s, partition=%d, offset=%d)%n",
						record.key(), value, record.partition(), record.offset());

					// 메시지 처리
					JSONObject jsonObject = new JSONObject(value);

					List<Payload.Comment> commentList = Arrays.stream(jsonObject.getJSONArray("comment_df").toList().toArray())
						.map(obj -> {
							JSONObject commentObj = new JSONObject((String) obj);
							return new Payload.Comment(
								commentObj.getString("id"),
								commentObj.getString("comments"),
								commentObj.getInt("likes"),
								commentObj.getInt("dislikes"),
								commentObj.getDouble("sentiment"),
								commentObj.getInt("label")
							);
						})
						.collect(Collectors.toList());

					List<Payload.AnalyzeResult> resultList = Arrays.stream(jsonObject.getJSONArray("cnt_df").toList().toArray())
						.map(obj -> {
							JSONObject resultObj = new JSONObject((String) obj);
							return new Payload.AnalyzeResult(
								resultObj.getInt("label"),
								resultObj.getInt("count"),
								resultObj.getDouble("ratio")
							);
						})
						.collect(Collectors.toList());

					JSONObject videoInfoJson = jsonObject.getJSONObject("video_info");
					Payload.VideoInfo videoInfo = new Payload.VideoInfo(
						videoInfoJson.getString("channel_title"),
						videoInfoJson.getString("subscriber_count"),
						videoInfoJson.getString("comment_count"),
						videoInfoJson.getString("like_count"),
						videoInfoJson.getString("title"),
						videoInfoJson.getString("view_count")
					);

					Payload payload = new Payload(commentList, resultList, videoInfo);

					// 잘 들어갔는지 확인하려고 출력해봄
					ObjectMapper mapper = new ObjectMapper();
					String jsonString = mapper.writeValueAsString(payload);
					System.out.println(jsonString);

					return payload;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}