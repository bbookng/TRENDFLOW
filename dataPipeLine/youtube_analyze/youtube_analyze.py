            "/home/j8e205/kafka/spark-sql-kafka-0-10_2.12-3.2.0.jar,/home/j8e205/kafka/kafka-clients-2.8.1.jar") \
    .getOrCreate()

consumer = KafkaConsumer(
    'youtube_url',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='latest',  # earliest or latest
    enable_auto_commit=True,
    group_id=None
)

producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
                         value_serializer=lambda x:
                         json.dumps(x).encode('utf-8'))

for message in consumer:
    url = message.value.decode('utf-8').replace('"', '')
    comments = fetch_comment_data(url)
    video_info = fetch_video_info(url)
    comment_df, cnt_df = analyze_sentiment(spark, comments)

    # Spark DataFrame을 사용하여 JSON 문자열 생성
    result = {
        'comment_df': comment_df.toJSON().collect(),
        'cnt_df': cnt_df.toJSON().collect(),
        'video_info': video_info
    }

    # 데이터를 JSON 문자열로 직렬화하여 카프카 토픽에 전송
    producer.send('youtube_analyze', value=result)
