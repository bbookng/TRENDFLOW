from datetime import datetime

# 파일 경로 설정

platforms = ['navernews', 'naverblog', 'daum']

# < 키워드별로 실행 >

# DB 연결
url = "jdbc:mysql://trendflow.site:3306/common?serverTimezone=Asia/Seoul&useSSL=false"

properties = {
    "user": "trendflow",
    "password": "trendflow205.!",
    "driver": "com.mysql.jdbc.Driver"
}

keyword_data = spark.read.jdbc(url=url, table='brand', properties=properties)
keywords = [row.name.replace(' ', '_').replace('.', '') for row in keyword_data.select("name").collect()]

import os
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.optimizers import RMSprop
import pickle
from pyspark.sql.functions import udf, current_timestamp, explode, pandas_udf, monotonically_increasing_id, when, lit, \
    col, PandasUDFType
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, TimestampType, ArrayType
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from konlpy.tag import Okt, Kkma, Komoran
import cloudpickle
import kss
import re
from datetime import datetime, timedelta
from functools import lru_cache
import pandas as pd
from pyspark.sql import SparkSession
import mysql.connector
import logging
import nltk

nltk.download('punkt')
class SentimentPredictor:
    def __init__(self, model_path, tokenizer_path, max_len=30, spark=None):
        self.loaded_model = load_model(model_path, compile=False)
        self.optimizer = RMSprop()
        self.loaded_model.compile(loss='binary_crossentropy', optimizer=self.optimizer, metrics=['accuracy'])
        with open(tokenizer_path, 'rb') as handle:
            self.tokenizer = pickle.load(handle)
        self.stopwords = ["의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다"]
        self.okt = Okt()
        self.max_len = max_len
        self.spark = spark

    def __getstate__(self):
        state = self.__dict__.copy()
        state['model_path'] = '/home/j8e205/test_model.h5'
        state['tokenizer_path'] = '/home/j8e205/last_tokenizer.pickle'
        state['spark'] = None
        del state['loaded_model']
        del state['optimizer']
        del state['tokenizer']
        del state['okt']
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)
        self.okt = Okt()
        self.loaded_model = load_model(state['model_path'], compile=False)
        self.optimizer = RMSprop(learning_rate=0.001)
        self.loaded_model.compile(loss='binary_crossentropy', optimizer=self.optimizer, metrics=['accuracy'])
        with open(state['tokenizer_path'], 'rb') as handle:
            self.tokenizer = pickle.load(handle)
        self.okt = Okt()
        self.stopwords = ["의", "가", "이", "은", "들", "는", "좀", "잘", "걍", "과", "도", "를", "으로", "자", "에", "와", "한", "하다"]
        self.spark = None

    def predict(self, sentence):
        new_sentence = re.sub(r'[^ㄱ-ㅎㅏ-ㅣ가-힣 ]', '', sentence)
        new_sentence = self.okt.morphs(new_sentence, stem=True)  # 토큰화
        new_sentence = [word for word in new_sentence if not word in self.stopwords]  # 불용어 제거
        encoded = self.tokenizer.texts_to_sequences([new_sentence])  # 정수 인코딩
        pad_new = pad_sequences(encoded, maxlen=self.max_len)  # 패딩
        score = float(self.loaded_model.predict(pad_new))  # 예측
        return score


def create_connection():
    properties = {"user": "trendflow", "password": "trendflow205.!", "host": "trendflow.site", "database": "analyzee"}
    conn = mysql.connector.connect(**properties)
    return conn


# spark = SparkSession.builder.master("local[4]") \
#     .appName("Sentimental_Analyze").config("spark.driver", "4g").getOrCreate()

spark = SparkSession.builder \
    .master("local[4]") \
    .appName("Sentimental_Analyze") \
    .config("spark.driver.memory", "8g") \
    .config("spark.executor.memory", "10g") \
    .config("spark.executor.memoryOverhead", "2g") \
    .config("spark.driver.extraJavaOptions", "-Dorg.slf4j.simpleLogger.defaultLogLevel=ERROR") \
    .config("spark.executor.extraJavaOptions", "-Dorg.slf4j.simpleLogger.defaultLogLevel=ERROR") \
    .getOrCreate()


def save_partition(partition):
    # 파티션 단위로 데이터를 저장하는 함수
    conn = None
    cursor = None

    try:
        conn = create_connection()
        cursor = conn.cursor()
        insert_query = "INSERT INTO sentiment (source_id, score, reg_dt) VALUES (%s, %s, %s)"
        for row in partition:
            date = row['date'].replace('-', '')
            cursor.execute(insert_query, (row['source_id'], row['score'], date))
        conn.commit()
    except mysql.connector.Error as e:
        print(f"Error message: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


# SentimentPredictor 객체 생성
predictor = SentimentPredictor('/home/j8e205/test_model.h5', '/home/j8e205/last_tokenizer.pickle', spark=spark)

# 객체 직렬화
with open('serialized_predictor.pkl', 'wb') as handle:
    cloudpickle.dump(predictor, handle)

# cloudpickle로 직렬화된 객체를 사용하는 UDF 생성
with open('serialized_predictor.pkl', 'rb') as handle:
    serialized_predictor = handle.read()

cp = cloudpickle.loads(serialized_predictor)


# pandas_udf를 사용하여 UDF 정의
@pandas_udf(DoubleType(), PandasUDFType.SCALAR)
def sentiment_udf(sentences):
    scores = []
    for sentence in sentences:
        try:
            score = cp.predict(sentence)
            scores.append(score)
        except Exception as e:
            sentencess = nltk.sent_tokenize(sentence)
            tmp = 0
            cnt = 0
            for i in sentencess:
                print(i)
                try:
                    score = cp.predict(i)
                    tmp += score
                    cnt += 1
                except:
                    continue

            if not cnt:
                scores.append(0.6)

            else:
                scores.append(float(tmp / cnt))

    return pd.Series(scores)


def calculate_score(sentences):
    scores = []
    for sentence in sentences:
        score = predictor.predict(sentence)
        scores.append(score)
    spark.stop()
    return pd.Series(scores)


def split_sentences(text):
    # 마침표, 느낌표, 물음표를 기준으로 문장을 분리합니다.
    # 마침표, 느낌표, 물음표 다음에 공백이 있거나 줄바꿈이 있는 경우에만 문장으로 인식합니다.
    # 괄호 안의 내용도 문장 구분을 합니다.
    # 한국어 문장 종결 어미를 추가하여 문장 구분을 합니다.
    sentences = re.split(
        "(?<=[.!?])\s+(?=[\"'])|\[.+?\]|\(.+?\)|(?<=[다|했음|였음|있다|했다|았다|었다|니다|라고|라며])[.!?]\s+|[.!?]\s+|\t|[.!?](?!\s)|[^\w\s.,!?\"']+",
        text)
    return sentences


# DataFrame에 UDF 적용
split_sentences_udf = udf(lambda content: split_sentences(content), ArrayType(StringType()))

score_udf = udf(lambda sentences: calculate_score(sentences), ArrayType(DoubleType()))

today = datetime.today() - timedelta(days=1)

# DB에 있는 키워드 관련 Data 모두 분석 실행
for keyword in keywords:
    files_path = [f"hdfs://cluster.p.ssafy.io:9000/user/j8e205/json/input/{platform}/{today.date()}/{keyword}.json" for platform in platforms]

    for file in files_path:
        try:
            df = spark.read.option("multiline", "true").json(file)
        except:
            continue

        print('----------------------파일불러왔음-------------------------------')

        df = df.repartition(8)  # 10개의 파티션으로 나눔

        print('---------------------------파티션 나눴음------------------------------')
        num_partitions = 24
        result_df = df.select("id", explode(split_sentences_udf("content")).alias("sentence")).repartition(num_partitions,
                                                                                                           "id").cache()
        result_df = result_df.withColumn("score", sentiment_udf("sentence").cast(DoubleType())).repartition(num_partitions,
                                                                                                            "id").cache()
        df = result_df.groupBy("id").avg("score").repartition(num_partitions, "id")

        result_df.unpersist()
        print('평균내기')

        df = df.withColumnRenamed("avg(score)", "score")

        print('컬럼 이름 바꿈')
        df = df.withColumn("score", when(df["score"] < 0.4, 0).when(df["score"] > 0.6, 1).otherwise(2))

        print('정수형으로 변환')

        url = "jdbc:mysql://trendflow.site:3306/analyzee?serverTimezone=Asia/Seoul&useSSL=false"

        old_df = spark.read.jdbc(url, table="sentiment", properties=properties)

        max_id = old_df.agg({"sentiment_id": "max"}).collect()[0][0]

        # 새로운 데이터프레임 생성

        new_df = df.select(col("id").alias("source_id"), "score")

        print('저장시작')

        new_df.repartition(num_partitions, "source_id").foreachPartition(lambda x: save_partition(x))

        print('저장끝')

# # Spark 세션 종료
spark.stop()