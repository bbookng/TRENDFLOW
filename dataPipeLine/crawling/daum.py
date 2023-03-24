import sys
import json
import os
import time
import random
import requests
from bs4 import BeautifulSoup as bs
from datetime import datetime, timedelta
from user_agent import generate_navigator

DIV_VALUE = 100

DATE_MIN_SLEEP_TIME = 1
DATE_MAX_SLEEP_TIME = 3

CONTENT_MIN_SLEEP_TIME = 1
CONTENT_MAX_SLEEP_TIME = 1

KEYWORD_MIN_SLEEP_TIME = 1
KEYWORD_MAX_SLEEP_TIME = 3

def datetime_to_str(date):
    return date.strftime("%Y%m%d")

def get_content(url):
    content = ""
    res = requests.get(url, headers = generate_navigator())
        
    soup = bs(res.text, 'lxml')

    for article in soup.select_one('div[class="article_view"]').select('p, div'):
        content = content + article.text

    return content

def process(keyword, start_date, end_date):
    list = []
    title_list = []
    page = 1
    past_ul = ""

    while True:
        sleep = random.randint(DATE_MIN_SLEEP_TIME, DATE_MAX_SLEEP_TIME)
        time.sleep(sleep / DIV_VALUE)
        url = 'https://m.search.daum.net/search?w=news&DA=PGD&enc=utf8&cluster=y&cluster_page=10&q=' + keyword + '&sort=accuracy&p=' + str(page) + '&period=u&sd=' + start_date + '000000&ed=' + end_date + '235959&n=100'
        res = requests.get(url, headers = generate_navigator())

        try:
            soup = bs(res.text, 'lxml')
            div = soup.select_one('div[class="compo-itemlist"]')
            ul = div.select("li")
        except:
            if not div:
                break
            print("############ 크롤링 방지 걸림 (아래 링크 클릭 후 방지문자 입력 필요) ############")
            print(res.text)
            print("################################################################################")
            input("입력 이후 Enter")

        if past_ul == ul:
            break

        for li in ul:
            title_info = li.select("a")[0]
            summary_info = li.select_one('a[class="desc clamp-g3"]')
            writer_info = li.find('div', 'area_writer')

            title = title_info.select_one('strong[class="tit-g clamp-g2"]').text.strip()
            link = title_info.attrs['href'].strip()
            summary = summary_info.text.strip()
            company = writer_info.select_one('a[class="txt_info clamp"]').text.strip()
            date_list = writer_info.select_one('span[class="txt_info"]').text[:-1].strip().split('.')            
            date = '{0}-{1:0>2}-{2:0>2}'.format(date_list[0], date_list[1], date_list[2])

            is_daum = writer_info.select_one('a[class="txt_info"]')

            if not is_daum or is_daum.text != "다음뉴스":
                continue
            
            if title in title_list:
                continue      
            title_list.append(title)

            sleep = random.randint(CONTENT_MIN_SLEEP_TIME, CONTENT_MAX_SLEEP_TIME)
            time.sleep(sleep / DIV_VALUE)

            try:
                content = get_content(link).strip()
            except:
                continue

            list.append({
                "title": title,
                "link" : link,
                "summary" : summary,
                "company" : company,
                "content" : content,
                "date" : date
            })

            print(link + " : " + date + " (" + keyword + ") : " + title)

        page = page + 1
        past_ul = ul

    return list;

def crawling(start_date, end_date):
    keyword_file = open("keyword.txt", 'r', encoding="utf-8")

    total_count = 0
    crawling_start = time.time()
    
    while True:
        now_date = start_date

        keyword_start = time.time()            
        keyword = keyword_file.readline().strip()

        list = []

        if not keyword:
            break

        while True:
            if now_date > end_date:
                break

            start = now_date
            end = now_date + timedelta(days=6)

            if end > end_date:
                end = end_date        
                
            start_str = datetime_to_str(start)
            end_str = datetime_to_str(end)

            print(start_str + "-" + end_str + " (" + keyword + ")")
            list_item = process(keyword, start_str, end_str)
            list = list + sorted(list_item, key = lambda item: (item['date']))
            now_date = now_date + timedelta(weeks=1)
        
        folder = "../data/daum/" + str(start_date.year) + "-" + str(start_date.month)
        # 디렉토리가 없으면 생성
        if not os.path.isdir(folder):
            os.mkdir(folder)

        with open(folder + "/daum_" + keyword + "_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".json", "w", encoding="utf-8") as outfile:
            json.dump(list, outfile, indent="\t", ensure_ascii=False)
        
        total_count += len(list)
        log = str(len(list)) + " : " + str(time.time() - keyword_start) + "s : " + keyword + "\n"

        print(log, end="")
        with open("../log/daum/daum_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
            log_file.write(log)

        sleep = random.randint(KEYWORD_MIN_SLEEP_TIME, KEYWORD_MAX_SLEEP_TIME)
        time.sleep(sleep / DIV_VALUE)

    with open("../log/daum/daum_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
        log = "#########################################\n"
        log += "total_time  : " + str(time.time() - crawling_start) +"s\n"
        log += "total_count : " + str(total_count) + "\n"
        log += "#########################################"
        log_file.write(log)

if __name__ == "__main__":    
    start = sys.argv[1].split('.')
    end = sys.argv[2].split('.')

    start = {
        "year": int(start[0]),
        "month" : int(start[1]),
        "day" : int(start[2]),
    }

    end = {
        "year": int(end[0]),
        "month" : int(end[1]),
        "day" : int(end[2])
    }

    start_date = datetime(start['year'], start['month'], start['day'])
    end_date = datetime(end['year'], end['month'], end['day']) + timedelta(days=-1)
    crawling(start_date, end_date)