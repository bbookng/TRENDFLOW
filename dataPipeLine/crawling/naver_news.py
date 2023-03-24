import os
import sys
import time
import json
import requests
from bs4 import BeautifulSoup
import re
from urllib.request import urlopen
from datetime import datetime, timedelta

START_PAGE = 0
END_PAGE = 268
SORT = '0'

def datetime_to_str(date):
    return date.strftime("%Y%m%d")

def getJsonContent(keyword, mem, searchUrl, startPage, endPage):
    jsonContent = []
    prevPage=[]
    searchUrlWithPage=''
    for page in range(startPage, endPage):    
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
                
                
                pageContent.append({'title':title, 'link':newsUrl, 'content':content,'date':str(date)})                                
                print(newsUrl + " : " + str(date) + " (" + keyword + ") : " + title)
            except:
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
            end = now_date + timedelta(days=15)

            if end > end_date:
                end = end_date        
                
            start_str = datetime_to_str(start)
            end_str = datetime_to_str(end)

            print(start_str + "-" + end_str + " (" + keyword + ")")
            list_item = getNaverNews(keyword, START_PAGE, END_PAGE, SORT, str(start.year), str(start.month), str(start.day), str(end.year), str(end.month), str(end.day))  
            
            if len(list_item) > 1:
                list = list + sorted(list_item, key = lambda item: (item['date']))

            now_date = now_date + timedelta(days=16)
        
        folder = "../data/navernews/" + str(start_date.year) + "-" + str(start_date.month)
        # 디렉토리가 없으면 생성
        if not os.path.isdir(folder):
            os.mkdir(folder)

        with open(folder + "/navernews_" + keyword + "_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".json", "w", encoding="utf-8") as outfile:
            json.dump(list, outfile, indent="\t", ensure_ascii=False)
        
        total_count += len(list)
        log = str(len(list)) + " : " + str(time.time() - keyword_start) + "s : " + keyword + "\n"

        print(log, end="")
        with open("../log/navernews/navernews_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
            log_file.write(log)

    with open("../log/navernews/navernews_" + datetime_to_str(start_date) + "-" + datetime_to_str(end_date) + ".txt", "a+", encoding="utf-8") as log_file:
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