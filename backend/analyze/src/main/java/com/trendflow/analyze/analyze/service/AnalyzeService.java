package com.trendflow.analyze.analyze.service;

import com.trendflow.analyze.analyze.dto.request.*;
import com.trendflow.analyze.analyze.dto.response.*;
import com.trendflow.analyze.analyze.dto.vo.GrapeQuotientInfo;
import com.trendflow.analyze.analyze.dto.vo.MentionCountInfo;
import com.trendflow.analyze.analyze.entity.Relation;
import com.trendflow.analyze.analyze.repository.RelationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final RelationRepository relationRepository;
    private final SentimentRepository sentimentRepository;

    private final KeywordService keywordService;

    public List<FindSocialResponse> findSocial(FindSocialRequest findSocialRequest) {
        // 키워드와 일치하는 키워드 객체 응답
        List<Keyword> keywordList = keywordService.getKeyword(findSocialRequest);

        // 소셜 별 언급량


        // 키워드의 일자별 긍정, 중립, 부정 지수
        // 기간 내에 키워드가 일치하는 keyword 캑체를 조회
        List<Sentiment> sentimentRepository.findBySourceIdIn(keywordList.stream()
                                    .map(Keyword::getSourceId)
                                    .collect(Collectors.toList()));



        return null;
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
