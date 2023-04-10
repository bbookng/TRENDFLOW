#!/usr/bin/env python3.8
import sys
from collections import defaultdict
import pymysql

current_id = None
current_dateint=0
wordDict = defaultdict(int)


con = pymysql.connect(host='trendflow.site',port=3306, user='trendflow', password='', db='keyword', charset='utf8')

cur = con.cursor()
insertSql = 'INSERT INTO keyword(source_id, platform_code, keyword, count, reg_dt) VALUES( %s, %s, %s, %s, %s)'

def printResult(wordDict):
    keys = wordDict.keys()
    if len(keys)>20:
        keys = sorted(wordDict, key=wordDict.get, reverse=True)[:20]
        if wordDict[keys[0]]>50:
            return
    for key in keys:
        if wordDict[key] > 2:
            cur.execute(insertSql, (current_id, 'SU200', key, wordDict[key], current_dateint))
            con.commit()
            print("%s\t%s\t%d" % (current_id, key, wordDict[key]))

for line in sys.stdin:
    # 입력으로부터 (word, count) 쌍을 추출
    try:
        id, word, count, dateint = line.strip().split('\t')
        count = int(count)
    except ValueError as e:
        # 입력이 잘못된 경우, 로그 출력 후 넘어감
        sys.stderr.write("Error parsing input: %s\n" % e)
        continue


    # 새로운 기사인 경우 출력 및 초기화
    if current_id and current_id != id:
        printResult(wordDict)
        wordDict = defaultdict(int)

    current_id = id
    current_dateint = dateint
    wordDict[word] += count

# 마지막 단어의 (word, count) 쌍 출력
if current_id:
    printResult(wordDict)
