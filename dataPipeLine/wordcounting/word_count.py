import pymysql
import json
import os
from konlpy.tag import Okt, Kkma
from collections import defaultdict
import numpy as np
import networkx as nx
okt = Okt()
splt = Kkma()

platform='navernews'
date='2023-04'


platformDic = {'daum':'SU100', 'navernews':'SU200', 'naverblog':'SU300'}
platformCode = platformDic[platform]



insertSql = 'INSERT INTO keyword(source_id, platform_code, keyword, count, reg_dt) VALUES( %s, %s, %s, %s, %s)'

t_classList = ['NNG', 'NNP', 'NP', 'VV', 'VA']
skipList = ['Verb', 'Number', 'Conjunction', 'Punctuation','Adverb']


global con, cur, id, brand_ids, brand
def connect():
    global id, con, cur, brand_ids
    con = pymysql.connect(host='trendflow.site',port=3306, user='trendflow', password='', db='common', charset='utf8') 
    
    # STEP 3: Connection 으로부터 Cursor 생성
    cur = con.cursor()
    
    
    sql = "SELECT brand_id, name FROM brand"
    cur.execute(sql)
    rows = cur.fetchall()
    
    brand_ids={}
    for row in rows:
        if row[0]==0:
            continue
        brand_ids[row[1]]=row[0]
    
    con = pymysql.connect(host='trendflow.site',port=3306, user='trendflow', password='trendflow205.!', db='keyword', charset='utf8') 
    cur = con.cursor()

#전체 text에서 문장 추출
def sentence_tokenize(text):
    sentences = text.split('.')
    sentences = [s.strip() for s in sentences if len(s) > 4]
    return sentences

#형태소 분석을 통한 단어 추출
def word_tokenize(sentences):
    wordsList = []
    for sentence in sentences:
        words=[]
        for (word, tp) in okt.pos(sentence):
            if len(word)== 1 or tp=='Josa':
                continue
            if tp == 'Noun':
                words.append(word)
            elif tp == 'Adjective':
                verbs = splt.pos(word)
                for (verb, t_class) in verbs:
                    if len(verb) == 1:
                        continue
                    if t_class  in t_classList and len(verb) != 1:
                        words.append(verb)
            elif tp not in skipList:
                words.append(word)
        wordsList.append(words)

    #print(wordsList)
    return wordsList



#뽑아낸 단어를 활용하여 문장별 중요도 점수 측정 후 주요 words 추출
def textrank(sentences, num_sent):
    wordsList = word_tokenize(sentences)
    '''
    word_frequency = defaultdict(int)
    for words in wordsList:
        for word in words:
            word_frequency[word] += 1

    # 문장 중요도 계산
    sentence_scores = []

    for i,sentence in enumerate(sentences):
        score = sum([ word_frequency[word] for word in wordsList[i] ])
        sentence_scores.append(score)
    '''
    #문장별 단어 set추출
    wordsSet = []
    for i in range(len(sentences)):
        wordsSet.append(set(wordsList[i]))

    # 문장 그래프 생성
    graph = np.zeros((len(sentences), len(sentences)))
    for i in range(len(sentences)-1):
        for j in range(i+1,len(sentences)):
            intersect = wordsSet[i] & wordsSet[j]
            union = wordsSet[i] | wordsSet[j]
            jaccard = len(intersect) / (len(union)+1)
            graph[i][j] = jaccard
            graph[j][i] = jaccard

    # 문장 중요도에 따라 그래프 랭킹 계산
    sentence_graph = nx.from_numpy_array(graph)
    scores = nx.pagerank(sentence_graph)
    ranked_sentences = sorted(((scores[i],i, s) for i, s in enumerate(sentences)), reverse=True)

    # 상위 num_sent 개의 문장 반환
    summary_sentences = []
    summary_wordsList=[]
    for i in range(num_sent):
        summary_wordsList.append( wordsList[ranked_sentences[i][1]] )
    return summary_wordsList


def getSummaryWordsList(text):
    sentences = sentence_tokenize(text)
    num_sent = len(sentences)
    if num_sent >= 5:
        num_sent = max( (num_sent // 3)*2, 3)

    summary = textrank(sentences, num_sent)
    return summary


def wordcount():
    global brand
    dir_path = "./data2/"+platform+"/"+date+"/"
    file_list = os.listdir(dir_path)
    #print(file_list)
    iscontinue = True
    for filename in file_list:
        '''
        if filename == '필립스.json':
            iscontinue=False
        if iscontinue:
            continue
        '''
        print(filename ,'실행 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        file_path = dir_path + filename
        brand = file_path.split('.')[0]
        with open(file_path, "r", encoding="utf-8") as f:
            json_data = json.load(f)
            for ele in json_data:
                content = ele['content']
                id = ele['id']
                
                datestr = ele['date']
                dateint = int(datestr.replace('-',''))
                wordsList = getSummaryWordsList(content)
                #print(wordsList)
                count(wordsList, id, dateint)

def count(wordsList, id, dateint):
    global brand

    wordDict = defaultdict(int)
    for words in wordsList:
        for word in words:
            wordDict[word]+=1
    
    keys = wordDict.keys()
    if len(keys)>20:
        keys = sorted(wordDict, key=wordDict.get, reverse=True)[:20]
        if wordDict[keys[0]] > 50:
            return
    try:
        for key in keys:
            if wordDict[key]>2:
                try:
                    cur.execute(insertSql, (id, platformCode, key, wordDict[key], dateint))
                except:
                    print("하나 실패!!")
                #print(key, wordDict[key], dateint)
        con.commit()
        print(brand,'id:',id,'실행완료 =============')
    except:
        print(brand,'id:',id,'실패!!! =============')
        

connect()
wordcount()
