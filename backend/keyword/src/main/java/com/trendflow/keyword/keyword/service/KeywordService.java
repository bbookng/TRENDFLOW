package com.trendflow.keyword.keyword.service;

import com.trendflow.keyword.global.code.HotKeywordCode;
import com.trendflow.keyword.global.redis.cache.HotKeyword;
import com.trendflow.keyword.global.redis.cache.HotKeywordRepository;
import com.trendflow.keyword.keyword.Repository.KeywordRepository;
import com.trendflow.keyword.keyword.dto.response.FindHotKeywordResponse;
import com.trendflow.keyword.keyword.entity.Keyword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;
    private  final HotKeywordRepository hotKeywordRepository;

    public FindHotKeywordResponse findHotKeyword() {
        // 캐시 서버에 갱신된 순위 정보 확인
        List<HotKeyword> dayHotKeyword = hotKeywordRepository.findById(HotKeywordCode.DAY_HOT_KEYWORD.getCode());
        List<HotKeyword> weekHotKeyword = hotKeywordRepository.findById(HotKeywordCode.WEEK_HOT_KEYWORD.getCode());

        List<Keyword> dayKeywordList = keywordRepository.findTop8ByRegDtOrderByCountDesc(LocalDateTime.now());
        List<Keyword> weekKeywordList = keywordRepository.findTop8ByRegDtOrderByCountDesc(LocalDateTime.now());

        // 일간 HOT Keyword
        if (dayHotKeyword == null) {
            // 정보가 없으면 등록
            List<Keyword> keywordList = keywordRepository.findTop8ByRegDtOrderByCountDesc(LocalDateTime.now());
            // 키워드 정보로 리스트 생성
            dayHotKeyword = new ArrayList<>();
            for (Integer rank = 0; rank < keywordList.size(); rank++){
                Keyword keyword = keywordList.get(rank);
                dayHotKeyword.add(HotKeyword.builder()
                                .rank(rank)
                                .keyword(keyword.getName())
                                .type(HotKeywordCode.TYPE_NEW.getCode())
                                .step(0)
                                .mentionCount(keyword.getCount())
                                .build());
            }
        } else {
            // 정보가 있으면 갱신
            dayHotKeyword = rankHotKeyword(dayHotKeyword, );

        }

        // 주간 HOT Keyword
        if (weekHotKeyword == null) {
            // 정보가 없으면 등록

        } else {
            // 정보가 있으면 갱신

        }



        return null;
    }

    private List<HotKeyword> rankHotKeyword(List<HotKeyword> past, List<Keyword> now) {
        List<HotKeyword> hotKeywordList = new ArrayList<>();

        for (Integer rank = 0; rank < now.size(); rank++){
            HotKeyword hotKeyword = HotKeyword.of(rank, now.get(rank));

            boolean isCheck = false;
            for (Integer search = 0; search < past.size(); search++) {
                if (hotKeyword.equals(past.get(search))) {

                    isCheck = true;
                    Integer typeValue = rank - search;
                    Integer step = Math.abs(typeValue);

                    // 순위 떨어짐
                    if (typeValue > 0) {
                        hotKeyword.setType(HotKeywordCode.TYPE_DOWN.getCode());
                        hotKeyword.setStep(step);
                    }
                    // 순위 고정
                    else if (typeValue == 0) {
                        hotKeyword.setType(HotKeywordCode.TYPE_SAME.getCode());
                        hotKeyword.setStep(step);
                    }
                    // 순위 올라감
                    else {
                        hotKeyword.setType(HotKeywordCode.TYPE_UP.getCode());
                        hotKeyword.setStep(step);
                    }
                    break;
                }
            }
            // 새로운 키워드가 온 경우
            if (!isCheck) {
                hotKeyword.setType(HotKeywordCode.TYPE_NEW.getCode());
                hotKeyword.setStep(0);
            }
            hotKeywordList.add(hotKeyword);
        }
        return hotKeywordList;
    }
}
