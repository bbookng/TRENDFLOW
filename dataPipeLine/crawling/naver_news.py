import pymysql
import os
import sys
import time
import json
import requests
from bs4 import BeautifulSoup
import re
from urllib.request import urlopen
from datetime import datetime, timedelta
from emoji import core

START_PAGE = 0
END_PAGE = 50
SORT = '0'


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

def getJsonContent(keyword, mem, searchUrl, startPage, endPage):
    global id
    jsonContent = []
    prevPage=[]
    searchUrlWithPage=''
    sql = "INSERT INTO source (source_id, brand_id, platform_code, title, link, content, reg_dt, thumb_img) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    cnt=0
    for page in range(startPage, endPage):    
        if cnt>200:
            print('200개 초과 중단!!')
            break
        pageStr = str(page*15 + 1)
        searchUrlWithPage = searchUrl + pageStr
        #searchUrlWithPage= 'https://m.search.naver.com/search.naver?where=m_news&sm=mtb_pge&query='+word+'&sort='+ sort +'&photo=0&field=0&pd=0&ds=&de=&cluster_rank=44&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all&start=' + pageStr  #기간설정x
        response = requests.get(searchUrlWithPage)
        html = response.text
        soup = BeautifulSoup(html,'html.parser')

        #뉴스 리스트뽑기
        news_tit = soup.select(".news_tit")
        # print(page,"페이지-",len(news_tit), "개=========================")
        
        pageContent=[]
        nowPage=[]
        for idx,src in enumerate(news_tit):
            try:
                title = re.sub('<.+?>', '', str(src), 0).strip()
                href = re.compile('(?<=\ href=")(.*?)(?=" )')
                newsUrl = href.findall(str(src))[0]
                
                if(idx<2):
                    nowPage.append(newsUrl)
                #네이버 뉴스아니면 continue
                if newsUrl[8:10] !='n.':
                    continue
                
                #뉴스 id 추출로 중복검사
                # print(newsUrl)
                

                newsId = newsUrl[33:].split('/')
                id0 = int(newsId[-2])
                id1 = int(newsId[-1].split('?')[0])
                #print(newsId, id0, id1)

                if id0 not in mem:
                    mem[id0]={}
                else:
                    if id1 in mem[id0]:
                        # print('중복!!')
                        continue
                    else:
                        mem[id0][id1]=True
                
                # 웹 페이지를 엽니다.
                page = BeautifulSoup(urlopen(newsUrl), 'html.parser')

                # 추출할 문자열을 포함한 태그를 찾습니다.
                content_tag = str(page.find('div', {'id':"dic_area"}))
                date_tag=''
                date=''
                
                #TV연예 뉴스인 경우
                if(content_tag == 'None'):
                    content_tag = str(page.find('div', {'id':"articeBody"}))
                    date_tag = str(page.find('span', {'class':"author"}))
                    match = re.search(r'\d{4}.\d{2}.\d{2}', date_tag)
                    date = datetime.strptime(match.group(), '%Y.%m.%d').date()  
                else:
                    date_tag = str(page.find('span', {'class':"media_end_head_info_datestamp_time _ARTICLE_DATE_TIME"}))
                    match = re.search(r'\d{4}-\d{2}-\d{2}', date_tag)
                    date = datetime.strptime(match.group(), '%Y-%m-%d').date()
                
                #year, month, day = date.year, date.month, date.day
                img=''
                img1 = page.find('img', {'id': 'img1'})
                if img1:
                    if img1.get('data-src') is not None:
                        img = img1.get('data-src')
                    elif img1.get('src') is not None:
                        img = img1.get('src')
                            

                #쓸데없는 태그 제거
                to_clean = re.compile('<.*?>')
                content = re.sub(to_clean, '', content_tag)
                
                #print("================================")
                #print("url : ",newsUrl)
                # print("제목 : ",title)
                #print(content)
                #print(date)

                #noun = word_extraction(content)
                #print("단어 : ", noun)
                title = core.replace_emoji(title, replace='')
                content = core.replace_emoji(content, replace='')
                
                
                dateint=int(str(date).replace("-", ""))
                cur.execute(sql, (id, brand_ids[keyword], 'SU200', title, newsUrl, content, dateint, img ))
                con.commit()
                pageContent.append({
                    'title':title, 
                    #'link':newsUrl, 
                    'content':content,
                    'date':str(date), 
                    'id':id
                }) 
                id+=1                               
                print('id:',(id-1) ,newsUrl ," : " , str(date) , " (" , keyword , ") : " , title)
                cnt+=1
            except Exception as e:
                print(e)
                pass

        #기사가 15개보다 작으면 마지막 페이지란뜻
        if len(news_tit)<15: 
            jsonContent += pageContent
            # print("마지막 페이지##########################",searchUrlWithPage)
            return jsonContent
        else:
            if len(pageContent)==0:
                if prevPage == nowPage:
                    # print("마지막 페이지##########################",searchUrlWithPage)
                    return jsonContent
            jsonContent += pageContent
        prevPage = nowPage
        
    return jsonContent

def getNaverNews(keyword, startPage, endPage, sort, sYear, sMonth, sDay, eYear, eMonth, eDay):
    
    startDate = '{0}.{1:0>2}.{2:0>2}'.format(sYear, sMonth, sDay)
    # startDate = sYear+ '.' + '{0<2}' + '.' +sDay
    endDate = '{0}.{1:0>2}.{2:0>2}'.format(eYear, eMonth, eDay)
    # endDate = eYear + '.' +eMonth + '.' +eDay
    startDate2 = '{0}{1:0>2}{2:0>2}'.format(sYear, sMonth, sDay)
    # startDate2 = sYear+sMonth+sDay
    endDate2 = '{0}{1:0>2}{2:0>2}'.format(eYear, eMonth, eDay)
    # endDate2 = eYear+eMonth+eDay

    mem={}
    file_name = 'naver_'+keyword+'_'+startDate2+'-'+endDate2+'.json'
    jsonContent=[]
    searchUrl= 'https://m.search.naver.com/search.naver?where=m_news&sm=mtb_pge&query='+keyword+'&sort='+sort+'&photo=0&field=0&pd=3&ds='+ startDate +'&de='+ endDate +'&cluster_rank=47&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from'+ startDate2 +'to'+ endDate2 +'&start='
    jsonContent = getJsonContent(keyword, mem, searchUrl, startPage, endPage)
    return jsonContent

def crawling(start_date, end_date):
    total_count = 0
    crawling_start = time.time()
    
    iscontinue=True
    for keyword in brand_ids.keys():

        keyword_start = time.time()      
        start_str = datetime_to_str(start_date)
        end_str = datetime_to_str(end_date)

        print(start_str + "-" + end_str + " (" + keyword + ")")
        list = getNaverNews(keyword, START_PAGE, END_PAGE, SORT, str(start_date.year), str(start_date.month), str(start_date.day), str(end_date.year), str(end_date.month), str(end_date.day))  
        
        list.sort( key = lambda item: (item['date']))
        
        folder = "./data2/navernews/" + str(start_date.year) + "-" + str(start_date.month) + "-" + str(start_date.day)
        # 디렉토리가 없으면 생성
        if not os.path.isdir(folder):
            os.mkdir(folder)
        
        keyword = keyword.replace(' ','_')
        keyword = keyword.replace('.','')
        with open(folder + "/" + keyword + ".json", "w", encoding="utf-8") as outfile:
            json.dump(list, outfile, indent="\t", ensure_ascii=False)
        
        total_count += len(list)
        log = str(len(list)) + " : " + str(time.time() - keyword_start) + "s : " + keyword + "\n"

        logFolder = "./log/navernews"
        if not os.path.isdir(logFolder):
            os.mkdir(logFolder)

        logFile = logFolder+"/navernews_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt"
        if not os.path.exists(logFile):
            with open(logFile, 'w', encoding='utf-8') as f:
                f.write("")

        print(log, end="")
        with open(logFile, "a+", encoding="utf-8") as log_file:
            log_file.write(log)
        print('잠시 쉬기')
        time.sleep(20)

    with open("./log/navernews/navernews_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
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
