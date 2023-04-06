from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from airflow.operators.dummy_operator import DummyOperator
from datetime import datetime, timedelta
import pytz


def task_failed(context):
    task_instance = context['task_instance']
    task_name = task_instance.task_id
    dag_id = task_instance.dag_id
    print(f'Task {task_name} failed in DAG {dag_id}. Retrying...')


default_args = {
    'start_date': datetime(2023, 4, 1, 0, 0, 0, tzinfo=pytz.timezone('Asia/Seoul')),
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
    'on_failure_callback': task_failed
}

dag = DAG('trendflow',
          schedule_interval='0 3 * * *',
          catchup=False,
          default_args=default_args
          )

naver_blog_crawling_task = BashOperator(
    task_id='naver_blog_crawling',
    bash_command='python3 /home/j8e205/crawling/getNaverBlog.py',
    dag=dag
)

naver_news_crawling_task = BashOperator(
    task_id='naver_news_crawling',
    bash_command='python3 /home/j8e205/crawling/getNaverNews.py',
    dag=dag
)

daum_news_crawling_task = BashOperator(
    task_id='daum_news_crawling',
    bash_command='python3 /home/j8e205/crawling/getDaum.py',
    dag=dag
)

sentimental_analyze_task = BashOperator(
    task_id='sentiment',
    bash_command='spark-submit --jars /home/j8e205/connectorj/connector.jar daily_sentimental_analyze.py',
    dag=dag
)

date = datetime.today() - timedelta(days=1)
naver_news_task = BashOperator(
    task_id='naver_news',
    bash_command=f"/bin/bash hdfsBatchSource/hadoop.sh \
            navernews \
            {date.date()}",
    dag=dag
)

naver_blog_task = BashOperator(
    task_id='naver_blog',
    bash_command=f'/bin/bash hdfsBatchSource/hadoop.sh \
            navernews \
            {date.date()}',
    dag=dag
)

daum_news_task = BashOperator(
    task_id='daum_news',
    bash_command=f'/bin/bash hdfsBatchSource/hadoop.sh \
            daum \
            {date.date()}',
    dag=dag
)

analyze_functions = [naver_blog_task, naver_news_task, daum_news_task, sentimental_analyze_task]
naver_news_crawling_task >> naver_blog_crawling_task >> daum_news_crawling_task >> analyze_functions