from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from airflow.operators.dummy_operator import DummyOperator
from datetime import datetime, timedelta

default_args = {
    'start_date': datetime(2023, 4, 1)
}

dag = DAG('trendflow',
          schedule_interval='0 3 * * *',
          catchup=False,
          default_args=default_args
          )

ssh_task = BashOperator(
    task_id='run_ls',
    bash_command='ls -al',
    dag=dag,
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
    bash_command=f"/bin/bash hadoop.sh \
            navernews \
            {date.date()}",
    dag=dag
)

naver_blog_task = BashOperator(
    task_id='naver_blog',
    bash_command=f'/bin/bash hadoop.sh \
            navernews \
            {date.date()}',
    dag=dag
    )

daum_news_task = BashOperator(
    task_id='daum_news',
    bash_command=f'/bin/bash hadoop.sh \
            daum \
            {date.date()}',
    dag=dag
    )

naver_news_crawling_task >> naver_blog_crawling_task >> daum_news_crawling_task >> DummyOperator(task_id='start_ssh_task', dag=dag)
naver_news_crawling_task >> naver_blog_crawling_task >> daum_news_crawling_task >> sentimental_analyze_task
map_reduce = [naver_blog_task, naver_news_task, daum_news_task]
for task in map_reduce:
    DummyOperator(task_id=f'start_{task.task_id}', dag=dag) >> task
