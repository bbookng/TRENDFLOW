from googleapiclient.discovery import build
from pyspark.sql import SparkSession
from kafka import KafkaConsumer, KafkaProducer
from pyspark.sql.functions import *
from pyspark.sql.types import *
import json
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, ArrayType
import kss
import cloudpickle
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import RMSprop
import pickle
from pyspark.sql.functions import udf, current_timestamp, explode, pandas_udf, monotonically_increasing_id
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, TimestampType, ArrayType
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from konlpy.tag import Okt
import cloudpickle
import kss
import re
import pandas as pd

api_key = "AIzaSyBPiZUwiXhGTWni6H_z87-8VTe_21EXw5c"


class SentimentPredictor:
    def __init__(self, model_path, tokenizer_path, max_len=30):
        with tf.device('/cpu:0'):
            self.loaded_model = load_model(model_path, compile=False)
            self.optimizer = RMSprop()
            self.loaded_model.compile(loss='binary_crossentropy', optimizer=self.optimizer, metrics=['accuracy'])

            with open(tokenizer_path, 'rb') as handle:
                self.tokenizer = pickle.load(handle)

        self.stopwords = ["의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다"]
        self.okt = Okt()
        self.max_len = max_len

    def __getstate__(self):
        state = self.__dict__.copy()
        state['model_path'] = '/home/j8e205/test_model.h5'  # model_path 추가
        state['tokenizer_path'] = '/home/j8e205/last_tokenizer.pickle'  # tokenizer_path 추가
        del state['okt']
        del state['optimizer']  # optimizer 변수 삭제
        del state['loaded_model']
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)

        # optimizer 변수 재생성
        self.optimizer = RMSprop(learning_rate=0.001)
        self.loaded_model = load_model(state['model_path'], compile=False)
        self.loaded_model.compile(loss='binary_crossentropy', optimizer=self.optimizer, metrics=['accuracy'])
        with open(state['tokenizer_path'], 'rb') as handle:
            self.tokenizer = pickle.load(handle)
        self.stopwords = ["의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다"]
        self.okt = Okt()
        self.max_len = state['max_len']

    def predict(self, sentence):
        new_sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣 ]', '', sentence)
        new_sentence = self.okt.morphs(new_sentence, stem=True)  # 토큰화
        new_sentence = [word for word in new_sentence if not word in self.stopwords]  # 불용어 제거
        encoded = self.tokenizer.texts_to_sequences([new_sentence])  # 정수 인코딩
        pad_new = pad_sequences(encoded, maxlen=self.max_len)  # 패딩
        score = float(self.loaded_model.predict(pad_new))  # 예측

        return score


def analyze_sentiment(spark, comments):
    # SentimentPredictor 객체 생성
    predictor = SentimentPredictor('/home/j8e205/test_model.h5', '/home/j8e205/last_tokenizer.pickle')

    # 객체 직렬화
    with open('serialized_predictor.pkl', 'wb') as handle:
        cloudpickle.dump(predictor, handle)

    # cloudpickle로 직렬화된 객체를 사용하는 UDF 생성
    with open('serialized_predictor.pkl', 'rb') as handle:
        serialized_predictor = handle.read()

    cp = cloudpickle.loads(serialized_predictor)
    sentiment_udf = udf(lambda x: cp.predict(x), DoubleType())

    # DataFrame 생성
    df = spark.createDataFrame(comments)

    # DataFrame 전처리
    spark.udf.register('split_sentences_udf', lambda content: kss.split_sentences(content), ArrayType(StringType()))
    sentence_df = df.selectExpr('id', 'comments', 'likes', 'dislikes',
                                'explode(split_sentences_udf(comments)) AS sentence')
    result_df = sentence_df.withColumn('score', sentiment_udf('sentence'))

    # 파티셔닝 및 집계
    transformed_df = result_df.repartition(10)
    avg_df = transformed_df.groupBy('id', 'comments', 'likes', 'dislikes').agg({'score': 'avg'}).withColumnRenamed(
        'avg(score)', 'sentiment')

    # sentiment 값에 따라 label 컬럼 추가
    labeled_df = avg_df.withColumn('label',
                                   when(avg_df.sentiment >= 0.6, 1).when(avg_df.sentiment < 0.4, 0).otherwise(2))

    # 0, 1, 2의 갯수를 카운트하는 코드
    count_df = labeled_df.groupBy('label').agg(count('id').alias('count'))
    total_count = count_df.agg(sum('count')).collect()[0][0]

    # 라벨별 비율을 계산하는 코드
    count_df = count_df.withColumn('ratio', 100 * (col('count') / lit(total_count)))

    # 결과 출력
    count_df.show()

    return [labeled_df, count_df]


def url_to_id(video_url):
    id = video_url.split('?v=')[1]
    if '&' in id:
        id = id.split('&')[0]

    return id


def fetch_video_info(video_url):
    video_id = url_to_id(video_url)
    youtube = build('youtube', 'v3', developerKey=api_key)

    video_info = youtube.videos().list(
        part='snippet,statistics',
        id=video_id
    ).execute()

    channel_id = video_info['items'][0]['snippet']['channelId']

    # 비디오의 제목
    title = video_info['items'][0]['snippet']['title']

    # 채널명
    channel_title = video_info['items'][0]['snippet']['channelTitle']

    # 채널 정보
    channel_info = youtube.channels().list(
        part='statistics',
        id=channel_id
    ).execute()

    # 조회수
    view_count = video_info['items'][0]['statistics']['viewCount']

    # 좋아요 수
    like_count = video_info['items'][0]['statistics']['likeCount']

    # 댓글 수
    comment_count = video_info['items'][0]['statistics']['commentCount']

    # 채널의 구독자 수
    subscriber_count = channel_info['items'][0]['statistics']['subscriberCount']

    return {
        'title': title,
        'channel_title': channel_title,
        'view_count': view_count,
        'like_count': like_count,
        'comment_count': comment_count,
        'subscriber_count': subscriber_count
    }


def fetch_comment_data(video_url):
    print('working')

    def clean_data(comment):
        if ('<' in comment) & ('>' in comment):
            comment = clean_tags(comment)
        return comment

    def clean_tags(comment):
        pattern = re.compile('<.*?>(.*</.*?>)?')
        text = re.sub(pattern, '', comment)
        return text

    video_id = url_to_id(video_url)
    comments = []
    likes = []
    dislikes = []
    ids = []
    youtube = build('youtube', 'v3', developerKey=api_key)

    video_response = youtube.commentThreads().list(
        part='snippet',
        videoId=video_id
    ).execute()
    page = 1

    cnt = 0
    while video_response:

        for item in video_response['items']:
            comment = clean_data(item['snippet']['topLevelComment']['snippet']['textDisplay'])
            like_cnt = item['snippet']['topLevelComment']['snippet']['likeCount']
            dislike_cnt = item['snippet']['topLevelComment']['snippet'].get('dislikeCount', 0)
            comment_id = item['snippet']['topLevelComment']['id']
            cnt += 1

            if comment != '':
                comments.append(comment)
                likes.append(like_cnt)
                dislikes.append(dislike_cnt)
                ids.append(comment_id)

        if 'nextPageToken' in video_response:
            video_response = youtube.commentThreads().list(
                part='snippet',
                videoId=video_id,
                pageToken=video_response['nextPageToken']
            ).execute()
            page += 1
        else:
            break

    data = pd.DataFrame({'id': ids, 'comments': comments, 'likes': likes, 'dislikes': dislikes})
    return data


# topic 읽어오기

spark = SparkSession \
    .builder \
    .appName("PySpark Structured Streaming with Kafka Demo") \
    .master("local[4]") \
    .config("spark.jars",
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

