#-*-coding: utf-8-*-
import time
import json
from konlpy.tag import Kkma
from collections import Counter
from wordcloud import WordCloud

splt = Kkma()

def word_extraction(content):
    words = []
    datas = splt.pos(content)    
    for (word, t_class) in datas:
        if t_class == 'NNG' or t_class == 'NNP' or t_class == 'NP':
            words.append(word)
    return words

def word_count(file_name):
    list = []
    
    success_count = 0
    fail_count = 0

    with open(file_name + '.json', 'r', encoding="utf-8") as open_file:
        datas = json.load(open_file)

    for data in datas:
        print(data['title'])
        try:
            list = list + word_extraction(data['content'])
            success_count += 1
        except:
            fail_count += 1
            pass

    for idx, item in enumerate(list):
        if len(item.strip()) < 2:
            list.pop(idx)
    
    word_count = Counter(list).most_common(100)

    # 워드 클라우드      
    wc = WordCloud(font_path='Cafe24Ssurround.ttf', background_color="white", width=1000, height=1000,max_words=100,max_font_size=300)
    wc.generate_from_frequencies(dict(word_count))
    wc.to_file(file_name + '_wordcloud.png')
    
    # 워드 카운트 파일 쓰기
    with open(file_name + "_wordcount.json", "w", encoding="utf-8") as outfile:
        json.dump(word_count, outfile, indent="\t", ensure_ascii=False)

    return success_count, fail_count

if __name__ == "__main__":
    start_time = time.time()
    success_count, fail_count = word_count('data/daum_나이키_20200101-20201231')
    print("######################## result ########################")
    print("success : " + str(success_count))
    print("fail : " + str(fail_count))
    print("duration : " + str(time.time() - start_time))
    print("########################################################")