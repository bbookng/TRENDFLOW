package com.trendflow.analyze.analyze.service;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class KafkaService {

	public class Payload {
		private List<String> cnt_df;
		private List<String> comment_df;
		private Map<String, String> video_info;

		public List<String> getCnt_df() {
			return cnt_df;
		}

		public void setCnt_df(List<String> cnt_df) {
			this.cnt_df = cnt_df;
		}

		public List<String> getComment_df() {
			return comment_df;
		}

		public void setComment_df(List<String> comment_df) {
			this.comment_df = comment_df;
		}

		public Map<String, String> getVideo_info() {
			return video_info;
		}

		public void setVideo_info(Map<String, String> video_info) {
			this.video_info = video_info;
		}
	}

	private final KafkaTemplate<String, Object> kafkaTemplate;

	public void sendYoutubeUrl(String url) {
		ProducerRecord<String, Object> producerRecord = new ProducerRecord<>("youtube_url", url);
		kafkaTemplate.send(producerRecord);
	}

	public void consumeYoutubeAnalyze() {
		// Kafka consumer 설정
		Map<String, Object> consumerProps = new HashMap<>();
		consumerProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "cluster.p.ssafy.io:9092");
		consumerProps.put(ConsumerConfig.GROUP_ID_CONFIG, "my-group");
		consumerProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
		consumerProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
		consumerProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
		consumerProps.put(JsonDeserializer.VALUE_DEFAULT_TYPE, "com.trendflow.analyze.analyze.service.KafkaService.Payload");
		consumerProps.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 1);

		DefaultKafkaConsumerFactory<String, KafkaService.Payload> consumerFactory = new DefaultKafkaConsumerFactory<>(consumerProps);
		KafkaConsumer<String, KafkaService.Payload> kafkaConsumer = consumerFactory.createConsumer();
		kafkaConsumer.subscribe(Collections.singletonList("youtube_analyze"));

		while (true) {
			ConsumerRecords<String, KafkaService.Payload> records = kafkaConsumer.poll(Duration.ofSeconds(1));
			if (records.isEmpty()) {
				continue;
			}
			for (ConsumerRecord<String, KafkaService.Payload> record : records) {
				// 메시지 처리
				System.out.println(record.value());
			}
			kafkaConsumer.commitSync();
		}
	}
}
