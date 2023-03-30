package com.trendflow.analyze.analyze.service;

import com.trendflow.analyze.analyze.dto.request.*;
import com.trendflow.analyze.analyze.dto.response.*;
import com.trendflow.analyze.analyze.dto.vo.CompareInfo;
import com.trendflow.analyze.analyze.dto.vo.GrapeQuotientInfo;
import com.trendflow.analyze.analyze.dto.vo.MentionCountInfo;
import com.trendflow.analyze.analyze.entity.Relation;
import com.trendflow.analyze.analyze.entity.Sentiment;
import com.trendflow.analyze.analyze.entity.SentimentCount;
import com.trendflow.analyze.analyze.repository.RelationRepository;
import com.trendflow.analyze.analyze.repository.SentimentRepository;
import com.trendflow.analyze.global.code.CommonCode;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.msa.dto.vo.Keyword;
import com.trendflow.analyze.msa.service.CommonService;
import com.trendflow.analyze.msa.service.KeywordService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final RelationRepository relationRepository;
    private final SentimentRepository sentimentRepository;

    private final CommonService commonService;
    private final KeywordService keywordService;

    public List<FindSocialResponse> findSocial(FindSocialRequest findSocialRequest) {

        List<FindSocialResponse> findSocialResponseList = new ArrayList<>();

        String keyword = findSocialRequest.getKeyword();
        LocalDateTime startDate = findSocialRequest.getStartDate();
        LocalDateTime endDate = findSocialRequest.getEndDate();

        // 플랫폼 별 언급량
        List<Keyword> keywordCountList = keywordService.getKeywordCount(keyword, startDate, endDate);

        // 키워드와 일치하는 키워드 객체 응답
        List<Keyword> keywordList = keywordService.getKeyword(keyword, startDate, endDate);
        // 키워드의 일자별, 소스별 긍정, 중립, 부정 지수
        List<SentimentCount> sentimentList = sentimentRepository.findBySourceIdIn(keywordList.stream()
                                    .map(Keyword::getSourceId)
                                    .collect(Collectors.toList()), startDate, endDate);

        // 맵 생성
        Map<LocalDate, MentionCountInfo> keywordCountMap = new HashMap<>();
        for (Keyword keywordCount : keywordCountList) {
            LocalDate now = keywordCount.getRegDt().toLocalDate();
            String platformCode = keywordCount.getPlatformCode();
            Long count = keywordCount.getCount();

            if (!keywordCountMap.containsKey(now))
                keywordCountMap.put(now, setMentionCountInfo(new MentionCountInfo(), platformCode, count));
            else
                keywordCountMap.put(now, setMentionCountInfo(keywordCountMap.get(now), platformCode, count));
        }

        Map<LocalDate, GrapeQuotientInfo> sentimentCountMap = new HashMap<>();
        for (SentimentCount sentimentCount : sentimentList) {
            LocalDate now = sentimentCount.getRegDt();
            Double score = sentimentCount.getScore();
            Long count = sentimentCount.getCount();

            if (!sentimentCountMap.containsKey(now))
                sentimentCountMap.put(now, setGrapeQuotientInfo(new GrapeQuotientInfo(), score, count));
            else
                sentimentCountMap.put(now, setGrapeQuotientInfo(sentimentCountMap.get(now), score, count));
        }

        LocalDate now = startDate.toLocalDate();
        LocalDate end = endDate.toLocalDate();
        while (now.isBefore(end)) {
            MentionCountInfo mentionCountInfo = new MentionCountInfo();
            GrapeQuotientInfo grapeQuotientInfo = new GrapeQuotientInfo();
            CompareInfo compareInfo = new CompareInfo();

            if (keywordCountMap.containsKey(now)) mentionCountInfo = keywordCountMap.get(now); 
            if (sentimentCountMap.containsKey(now)) grapeQuotientInfo = sentimentCountMap.get(now);
            
            // 비교 로직 추가


            findSocialResponseList.add(FindSocialResponse.builder()
                            .date(now)
                            .mentionCountInfo(mentionCountInfo)
                            .grapeQuotientInfo(grapeQuotientInfo)
                            .compareInfo(compareInfo)
                            .build());
        }

        return findSocialResponseList;
    }

    private MentionCountInfo setMentionCountInfo(MentionCountInfo mentionCountInfo, String platformCode, Long count) {
        String DAUM = commonService.getLocalCode(CommonCode.DAUM.getName()).getCode();
        String NAVER = commonService.getLocalCode(CommonCode.DAUM.getName()).getCode();
        String TWITTER = commonService.getLocalCode(CommonCode.DAUM.getName()).getCode();

        if (platformCode.equals(DAUM)) mentionCountInfo.setDaum(count.intValue());
        else if (platformCode.equals(NAVER)) mentionCountInfo.setNaver(count.intValue());
        else if (platformCode.equals(TWITTER)) mentionCountInfo.setTwitter(count.intValue());

        return mentionCountInfo;
    }

    private GrapeQuotientInfo setGrapeQuotientInfo(GrapeQuotientInfo grapeQuotientInfo, Double score, Long count) {
        if (score > 0.0) grapeQuotientInfo.setPositive(count.intValue());
        else if (score < 0.0) grapeQuotientInfo.setNegative(count.intValue());
        else grapeQuotientInfo.setNeutral(count.intValue());

        return grapeQuotientInfo;
    }

    public List<FindRelationContentResponse> findRelationContent(FindRelationContentRequest findRelationContentRequest) {
        System.out.println("findRelationContentRequest = " + findRelationContentRequest);
        return null;
    }

    public List<FindYoutubeResponse> findYoutube(FindYoutubeRequest findYoutubeRequest) {
        System.out.println("findYoutubeRequest = " + findYoutubeRequest);
        return null;
    }

    public List<FindYoutubeCommentResponse> findYoutubeComment(FindYoutubeCommentRequest findYoutubeCommentRequest) {
        System.out.println("findYoutubeCommentRequest = " + findYoutubeCommentRequest);
        return null;
    }

    public List<FindCompareKeywordResponse> findCompareKeyword(FindCompareKeywordRequest findCompareKeywordRequest) {
        System.out.println("findCompareKeywordRequest = " + findCompareKeywordRequest);
        return null;
    }

    @Transactional
    public List<FindRelationKeywordResponse> findRelationKeyword(Long keywordId) {
        List<Relation> relationList = relationRepository.findTop8ByKeywordIdOrderByCountDesc(keywordId);
        return relationList.stream()
                .map(FindRelationKeywordResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<FindWordCloudKeywordResponse> findWordCloudKeyword(Long keywordId) {
        List<Relation> relationList = relationRepository.findTop200ByKeywordIdOrderByCountDesc(keywordId);
        return relationList.stream()
                .map(FindWordCloudKeywordResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
