#!/usr/bin/env python3.8
import sys
import json
from konlpy.tag import Okt, Kkma
from collections import defaultdict
import numpy as np
import networkx as nx
okt = Okt()
splt = Kkma()



words = []
id=0
t_classList = ['NNG', 'NNP', 'NP', 'VV', 'VA']
skipList = ['Verb', 'Number', 'Conjunction', 'Punctuation','Adverb']
dateint=0
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



for line in sys.stdin:
    if len(line) >= 10 and "content" == line[3:10]:
        content = line[12:]
        wordsList = getSummaryWordsList(content)
    elif len(line)>=7 and line[3:7]=="date":
        date= line[11:-3]
        dateint = int(date.replace("-", ""))

    elif len(line) >= 6 and line[3:5] == "id":
        id = int(line[8:])
        for words in wordsList:
            for word in words:
                print("%d\t%s\t%d\t%d" % (id, word, 1,dateint))
    #elif len(line) >= 7 and line[3:7] == "link":
    #    link = line[10:-1]