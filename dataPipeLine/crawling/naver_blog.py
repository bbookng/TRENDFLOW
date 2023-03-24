import sys
import json
import os
import time
import requests
from bs4 import BeautifulSoup as bs
from datetime import datetime, timedelta
from user_agent import generate_navigator

MAX_PAGE = 33

def datetime_to_str(date):
    return date.strftime("%Y%m%d")

def get_content(link):
    res = requests.get(link, headers = generate_navigator())

    soup = bs(res.text, 'lxml')
    iframe = soup.select_one('iframe[name="mainFrame"]')
    url = 'https://blog.naver.com' + iframe.attrs['src']

    content = ''
    
    res = requests.get(url, headers = generate_navigator())    
    frame = bs(res.content, 'lxml')

    title = frame.select_one('div[class="se-component-content"]').select_one('span').text.strip() 
    if frame.select_one('div[class="se-main-container"]'):
        content = frame.select_one('div[class="se-main-container"]').get_text().replace("\n", "").strip()

    return title, content

def process(keyword, start_date, end_date):
    date_prefix = '\\\\\"sub_time'
    summary_prefix = '\\\\\"api_txt_lines'
    link_prefix = '\\\\\"api_txt_lines'

    list = []
    page = 1
    past_ul = ""

    ori_url = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=blog&query=' + keyword + '&oquery=' + keyword + '&tqi=isDBhsprvxZsslqjmzsssssst30-132709&nso=so%3Ar%2Cp%3Afrom' + end_date + 'to' + start_date
    ori_res = requests.get(ori_url, headers = generate_navigator())

    soup = bs(ori_res.text, 'lxml')
    div = soup.select_one('div[class="review_loading _trigger_base"]')
    url_split = div.attrs['data-api'].split('&')

    for s in url_split:
        if s.startswith('start'):
            url_split.remove(s)            

    ori_url = ''
    for s in url_split:
        ori_url = ori_url + '&' + s
    ori_url = ori_url[1:] + '&start='

    while int(len(list) / 30) < MAX_PAGE:
        url = ori_url + str(page)
        res = requests.get(url, headers = generate_navigator())
        
        soup = bs(res.text, 'lxml')
        ul = soup.select('li')

        # 이전페이지와 동일한 페이지이면 중지
        if past_ul == ul:
            break
        
        for li in ul:
            div = li.select_one("div[class='" + summary_prefix + "']")
            span = li.select_one("span[class='" + date_prefix + "']")
            link = li.select_one("a[class='" + link_prefix + "']")
        
            summary = div.text
            date = span.text[:-1].replace('.', '-')
            link = link.attrs['href'].replace("\\\"", "")

            try:
                title, content = get_content(link)

                if title == '' or content == '':
                    continue

                list.append({
                    "title" : title,
                    "content" : content,
                    "link" : link,
                    "summary" : summary,
                    "date" : date
                })

                print(link + " : " + date + " (" + keyword + ") : " + title)

            except:
                pass

        page = page + 30
        past_ul = ul
    
    return list

def crawling(start_date, end_date):
    keyword_file = open("keyword.txt", 'r', encoding="utf-8")
        
    total_count = 0
    crawling_start = time.time()

    while True:        
        keyword_start = time.time()
        keyword = keyword_file.readline().strip()

        list = []

        if not keyword:
            break

        start_str = datetime_to_str(start_date)
        end_str = datetime_to_str(end_date)
        
        list_item = process(keyword, start_str, end_str)
        list = list + sorted(list_item, key = lambda item: (item['date']))

        folder = "../data/naverblog/" + str(start_date.year) + "-" + str(start_date.month)
        # 디렉토리가 없으면 생성
        if not os.path.isdir(folder):
            os.mkdir(folder)

        with open(folder + "/naverblog_" + keyword + "_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".json", "w", encoding="utf-8") as outfile:
            json.dump(list, outfile, indent="\t", ensure_ascii=False)
        
        total_count += len(list)
        log = str(len(list)) + " : " + str(time.time() - keyword_start) + "s : " + keyword + "\n"
        
        print(log, end="")
        with open("../log/naverblog/naverblog_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
            log_file.write(log)

    with open("../log/naverblog/naverblog_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
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