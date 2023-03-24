from datetime import datetime
from airflow import DAG
from airflow.providers.ssh.operators.ssh import SSHOperator

default_args = {
    'start_date': datetime(2023, 3, 13)
}

dag = DAG('ssh_example',
          schedule_interval = '*/10 * * * *',
          catchup = False,
          default_args=default_args
          )

ssh_task = SSHOperator(
    ssh_conn_id='connection_test',
    task_id='run_ls',
    command='ls -al',
    dag=dag,
)

ssh_task