import pymysql
import os
import sys
import time
import json
import requests
from bs4 import BeautifulSoup as bs
from urllib.request import urlopen
from datetime import datetime, timedelta
from emoji import core
from user_agent import generate_navigator

MAX_PAGE = 33

global con, cur, id, brand_ids

def connect():
    global id, con, cur, brand_ids
    con = pymysql.connect(host='trendflow.site',port=3306, user='trendflow', password='trendflow205.!', db='common', charset='utf8') 
    
    # STEP 3: Connection 으로부터 Cursor 생성
    cur = con.cursor()
    
    # STEP 4: SQL문 실행 및 Fetch
    sql = "SELECT max(source_id) FROM source"
    cur.execute(sql)
    rows = cur.fetchall()

    id = rows[0][0]+1

    sql = "SELECT brand_id, name FROM brand"
    cur.execute(sql)
    rows = cur.fetchall()
    
    brand_ids={}
    for row in rows:
        if row[0]==0:
            continue
        brand_ids[row[1]]=row[0]



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
    global id
    date_prefix = '\\\\\"sub_time'
    summary_prefix = '\\\\\"api_txt_lines'
    link_prefix = '\\\\\"api_txt_lines'
    img_prefix = '\\\\\"thumb'

    list = []
    page = 1
    past_ul = ""

    ori_url = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=blog&query=' + keyword + '&oquery=' + keyword + '&tqi=isDBhsprvxZsslqjmzsssssst30-132709&nso=so%3Ar%2Cp%3Afrom' + start_date + 'to' + end_date
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

    sql = "INSERT INTO source (source_id, brand_id, platform_code, title, link, content, reg_dt, thumb_img) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    
    cnt=0
    
    while int(len(list) / 30) < MAX_PAGE:
        if cnt>50:
            break
        url = ori_url + str(page)
        print('url: '+url)
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
            img_tag = li.select_one("img[class='" + img_prefix + "']")

            img=''
            if img_tag:
                try:
                    imgSrc=img_tag['src']
                    for i in range(len(imgSrc)-1,3,-1):
                        if imgSrc[i]=='%' and imgSrc[i-4]=='.':
                            img=imgSrc[2:i]    
                            break
                except:
                    pass
            summary = div.text
            date=''
            if '.' in span.text[:-1]:
                date = span.text[:-1].replace('.', '-')
            else:
                yesterday = datetime.today() - timedelta(days=1)
                date = yesterday.strftime('%Y-%m-%d')
            link = link.attrs['href'].replace("\\\"", "")
            #print(link, date, "span[class='" + date_prefix + "']")
            try:
                title, content = get_content(link)

                if title == '' or content == '':
                    continue

                title = core.replace_emoji(title, replace='')
                content = core.replace_emoji(content, replace='')
                dateint=int(str(date).replace("-", ""))
                
                #cur.execute(sql, (id, brand_ids[keyword], 'SU300', title, link, content, dateint, img ))
                #con.commit()

                list.append({
                    "title" : title,
                    "content" : content,
                    #"link" : link,
                    #"summary" : summary,
                    "date" : date,
                    "id": id
                })
                id+=1
                print(link + " : " + date + " (" + keyword + ") : " + title)
                #print(img)
                cnt+=1
            except Exception as e:
                print(e)
                pass

        page = page + 30
        past_ul = ul
    
    return list

def crawling(start_date, end_date):

    total_count = 0
    crawling_start = time.time()
    iscontinue=True
    for keyword in brand_ids.keys():

        keyword_start = time.time()
        
        start_str = datetime_to_str(start_date)
        end_str = datetime_to_str(end_date)
        
        list = process(keyword, start_str, end_str)
        list.sort( key = lambda item: (item['date']))

        folder = "./data2/naverblog/" + str(start_date.year) + "-" + str(start_date.month) + "-" + str(start_date.day)
        # 디렉토리가 없으면 생성
        if not os.path.isdir(folder):
            os.mkdir(folder)

        keyword = keyword.replace(' ','_')
        keyword = keyword.replace('.','')
        with open(folder + "/" + keyword + ".json", "w", encoding="utf-8") as outfile:
            json.dump(list, outfile, indent="\t", ensure_ascii=False)
        
        total_count += len(list)
        log = str(len(list)) + " : " + str(time.time() - keyword_start) + "s : " + keyword + "\n"
        
        logFolder = "./log/naverblog"
        if not os.path.isdir(logFolder):
            os.mkdir(logFolder)

        logFile = logFolder+"/naverblog_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt"
        if not os.path.exists(logFile):
            with open(logFile, 'w', encoding='utf-8') as f:
                f.write("")

        print(log, end="")
        with open(logFile, "a+", encoding="utf-8") as log_file:
            log_file.write(log)

    with open("./log/naverblog/naverblog_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
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
    end_date = datetime(end['year'], end['month'], end['day'])
    
    connect()
    crawling(start_date, end_date)
