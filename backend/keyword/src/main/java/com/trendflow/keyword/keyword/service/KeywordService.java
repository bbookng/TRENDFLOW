package com.trendflow.keyword.keyword.service;

import com.trendflow.keyword.global.code.KeywordCacheCode;
import com.trendflow.keyword.global.exception.NotFoundException;
import com.trendflow.keyword.global.redis.cache.HotKeyword;
import com.trendflow.keyword.global.redis.cache.HotKeywordRepository;
import com.trendflow.keyword.global.redis.cache.RelateKeyword;
import com.trendflow.keyword.global.redis.cache.RelateKeywordRepository;
import com.trendflow.keyword.keyword.Repository.KeywordRepository;
import com.trendflow.keyword.keyword.dto.response.FindHotKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRecommendKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRelateKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindWordCloudResponse;
import com.trendflow.keyword.keyword.entity.Keyword;
import com.trendflow.keyword.msa.service.AnalyzeService;
import com.trendflow.keyword.msa.vo.Relation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordRepository keywordRepository;
    private final HotKeywordRepository hotKeywordRepository;
    private final RelateKeywordRepository relateKeywordRepository;

    private final AnalyzeService analyzeService;

    @Value("${keyword.result.expire}")
    private Integer resultExpire;

    @Transactional
    public FindHotKeywordResponse findHotKeyword() throws RuntimeException {
        /*
            60 분마다 갱신
         */

        // 일간 HOT Keyword
        // 이미 계산된 결과가 없으면 (만료시간이 되서 결과가 사라져 갱신해야되는 경우) 계산 시작
        List<HotKeyword> dayNow = hotKeywordRepository.findById(KeywordCacheCode.DAY_HOT_KEYWORD_RESULT.getCode())
                .orElseGet(() -> {
                    // 새로운 결과를 가져와 리스트 생성 (현재 기준 값)
                    List<Keyword> dayKeywordList = keywordRepository.findTop8ByRegDtBetweenOrderByCountDesc(LocalDate.now().atStartOfDay(), LocalDateTime.now());
                    List<HotKeyword> now = new ArrayList<>();
                    for (Integer rank = 0; rank < dayKeywordList.size(); rank++) {
                        Keyword keyword = dayKeywordList.get(rank);
                        now.add(HotKeyword.builder()
                                .rank(rank + 1)
                                .keyword(keyword.getKeyword())
                                .type(KeywordCacheCode.TYPE_NEW.getCode())
                                .step(0)
                                .mentionCount(keyword.getCount())
                                .build());
                    }
                    // 과거 결과를 가져옴
                    Optional<List<HotKeyword>> dayPast = hotKeywordRepository.findById(KeywordCacheCode.DAY_HOT_KEYWORD.getCode());
                    // 과거 결과가 있으면 비교 로직 수행
                    if (dayPast.isPresent()) now = rankHotKeyword(now, dayPast.get());

                    hotKeywordRepository.save(KeywordCacheCode.DAY_HOT_KEYWORD.getCode(), now);
                    hotKeywordRepository.saveResult(KeywordCacheCode.DAY_HOT_KEYWORD_RESULT.getCode(), now, resultExpire);
                    return now;
                });

        // 주간 HOT Keyword
        // 이미 계산된 결과가 없으면 (만료시간이 되서 결과가 사라져 갱신해야되는 경우) 계산 시작
        List<HotKeyword> weekNow = hotKeywordRepository.findById(KeywordCacheCode.WEEK_HOT_KEYWORD_RESULT.getCode())
                .orElseGet(() -> {
                    List<Keyword> weekKeywordList = keywordRepository.findTop8ByRegDtBetweenOrderByCountDesc(LocalDateTime.now().minusDays(7), LocalDateTime.now());
                    List<HotKeyword> now = new ArrayList<>();
                    for (Integer rank = 0; rank < weekKeywordList.size(); rank++) {
                        Keyword keyword = weekKeywordList.get(rank);
                        now.add(HotKeyword.builder()
                                .rank(rank + 1)
                                .keyword(keyword.getKeyword())
                                .type(KeywordCacheCode.TYPE_NEW.getCode())
                                .step(0)
                                .mentionCount(keyword.getCount())
                                .build());
                    }
                    // 기존 데이터가 있으면 비교해서 리스트 변경
                    Optional<List<HotKeyword>> weekPast = hotKeywordRepository.findById(KeywordCacheCode.WEEK_HOT_KEYWORD.getCode());
                    if (weekPast.isPresent()) now = rankHotKeyword(now, weekPast.get());

                    hotKeywordRepository.save(KeywordCacheCode.WEEK_HOT_KEYWORD.getCode(), now);
                    hotKeywordRepository.saveResult(KeywordCacheCode.WEEK_HOT_KEYWORD_RESULT.getCode(), now, resultExpire);
                    return now;
                });

        return FindHotKeywordResponse.builder()
                .day(dayNow)
                .week(weekNow)
                .build();
    }

    public FindRecommendKeywordResponse findRecommendKeyword() throws RuntimeException {


        return FindRecommendKeywordResponse.builder()

                .build();
    }

    public List<FindRelateKeywordResponse> findRelateKeyword(String keyword) throws RuntimeException {
        Long keywordId = keywordRepository.findByKeyword(keyword)
                .orElseThrow(() -> new NotFoundException())
                .getKeywordId();

        List<RelateKeyword> relateNow = relateKeywordRepository.findById(KeywordCacheCode.RELATE_KEYWORD_RESULT.getCode())
                .orElseGet(() -> {
                    List<Relation> relationList = analyzeService.getRelation(keywordId);
                    List<RelateKeyword> now = new ArrayList<>();
                    for (Integer rank = 0; rank < relationList.size(); rank++) {
                        Relation relation = relationList.get(rank);
                        now.add(RelateKeyword.builder()
                                .rank(rank + 1)
                                .keyword(relation.getRelationKeyword())
                                .type(KeywordCacheCode.TYPE_NEW.getCode())
                                .step(0)
                                .relatedCount(relation.getCount())
                                .build());
                    }
                    // 기존 데이터가 있으면 비교해서 리스트 변경
                    Optional<List<RelateKeyword>> relatePast = relateKeywordRepository.findById(KeywordCacheCode.RELATE_KEYWORD.getCode());
                    if (relatePast.isPresent()) now = rankRelateKeyword(now, relatePast.get());

                    relateKeywordRepository.save(KeywordCacheCode.RELATE_KEYWORD.getCode(), now);
                    relateKeywordRepository.saveResult(KeywordCacheCode.RELATE_KEYWORD_RESULT.getCode(), now, resultExpire);
                    return now;
                });

        return FindRelateKeywordResponse.toList(relateNow);
    }

    public FindWordCloudResponse findWordCloudKeyword(String keyword) throws RuntimeException {

        return null;
    }

    private List<HotKeyword> rankHotKeyword(List<HotKeyword> now, List<HotKeyword> past) {
        List<HotKeyword> hotKeywordList = new ArrayList<>();

        for (Integer src = 0; src < now.size(); src++){
            HotKeyword hotKeyword = now.get(src);

            Boolean isNew = true;

            for (Integer search = 0; search < past.size(); search++) {
                if (hotKeyword.getKeyword().equals(past.get(search).getKeyword())) {
                    isNew = false;
                    Integer typeValue = src - search;
                    Integer step = Math.abs(src - search);

                    // 순위 떨어짐
                    if (typeValue > 0) {
                        hotKeyword.setType(KeywordCacheCode.TYPE_DOWN.getCode());
                        hotKeyword.setStep(step);
                    }
                    // 순위 고정
                    else if (typeValue == 0) {
                        hotKeyword.setType(KeywordCacheCode.TYPE_SAME.getCode());
                        hotKeyword.setStep(step);
                    }
                    // 순위 올라감
                    else {
                        hotKeyword.setType(KeywordCacheCode.TYPE_UP.getCode());
                        hotKeyword.setStep(step);
                    }
                    break;
                }
            }
            // 새로운 키워드가 온 경우
            if (isNew) {
                hotKeyword.setType(KeywordCacheCode.TYPE_NEW.getCode());
                hotKeyword.setStep(0);
            }
            hotKeywordList.add(hotKeyword);
        }

        for (Integer rank = 1; rank <= hotKeywordList.size(); rank++){
            hotKeywordList.get(rank - 1).setRank(rank);
        }

        return hotKeywordList;
    }

    private List<RelateKeyword> rankRelateKeyword(List<RelateKeyword> now, List<RelateKeyword> past) {
        List<RelateKeyword> relateKeywordList = new ArrayList<>();

        for (Integer src = 0; src < now.size(); src++){
            RelateKeyword relateKeyword = now.get(src);

            Boolean isNew = true;

            for (Integer search = 0; search < past.size(); search++) {
                if (relateKeyword.getKeyword().equals(past.get(search).getKeyword())) {
                    isNew = false;
                    Integer typeValue = src - search;
                    Integer step = Math.abs(src - search);

                    // 순위 떨어짐
                    if (typeValue > 0) {
                        relateKeyword.setType(KeywordCacheCode.TYPE_DOWN.getCode());
                        relateKeyword.setStep(step);
                    }
                    // 순위 고정
                    else if (typeValue == 0) {
                        relateKeyword.setType(KeywordCacheCode.TYPE_SAME.getCode());
                        relateKeyword.setStep(step);
                    }
                    // 순위 올라감
                    else {
                        relateKeyword.setType(KeywordCacheCode.TYPE_UP.getCode());
                        relateKeyword.setStep(step);
                    }
                    break;
                }
            }
            // 새로운 키워드가 온 경우
            if (isNew) {
                relateKeyword.setType(KeywordCacheCode.TYPE_NEW.getCode());
                relateKeyword.setStep(0);
            }
            relateKeywordList.add(relateKeyword);
        }

        for (Integer rank = 1; rank <= relateKeywordList.size(); rank++){
            relateKeywordList.get(rank - 1).setRank(rank);
        }

        return relateKeywordList;
    }
}
