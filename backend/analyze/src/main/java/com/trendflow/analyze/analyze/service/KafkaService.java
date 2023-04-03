import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;
import java.util.Collections;
import java.util.Properties;
import java.time.Duration;
import com.google.gson.JsonParser;

public class KafkaService {
	private final String bootstrapServers = "cluster.p.ssafy.io:9092";
	private final String youtubeUrlTopic = "youtube_url";
	private final String youtubeAnalyzeTopic = "youtube_analyze";
	private final JsonParser jsonParser = new JsonParser();

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
		props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
		props.put(ConsumerConfig.GROUP_ID_CONFIG, groupId);
		props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
		props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "latest");
		KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
		consumer.subscribe(Collections.singletonList(youtubeAnalyzeTopic));
		return consumer;
	}

	public void produceYoutubeUrl() {
		try (KafkaProducer<String, String> kafkaProducer = createKafkaProducer()) {
			String url = "https://www.youtube.com/watch?v=wMRvCP6y0Ys";
			ProducerRecord<String, String> record = new ProducerRecord<>(youtubeUrlTopic, url);
			RecordMetadata metadata = kafkaProducer.send(record).get();
			System.out.printf("Produced record (key=%s, value=%s) meta(partition=%d, offset=%d)%n",
				record.key(), record.value(), metadata.partition(), metadata.offset());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void consumeYoutubeAnalyze() {
		try (KafkaConsumer<String, String> kafkaConsumer = createKafkaConsumer()) {
			while (true) {
				ConsumerRecords<String, String> records = kafkaConsumer.poll(Duration.ofMillis(100));
				for (ConsumerRecord<String, String> record : records) {
					String value = record.value();
					System.out.printf("Received record (key=%s, value=%s, partition=%d, offset=%d)%n",
						record.key(), value, record.partition(), record.offset());
					// 메시지 처리
					String analyzeResult = jsonParser.parse(value).getAsJsonObject().get("analyze_result").getAsString();
					System.out.println(analyzeResult);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}