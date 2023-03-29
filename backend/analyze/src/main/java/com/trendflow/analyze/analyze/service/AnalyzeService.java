package com.trendflow.analyze.analyze.service;

import com.trendflow.analyze.analyze.dto.response.FindRelationKeywordResponse;
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

    @Transactional
    public List<FindRelationKeywordResponse> findRelationKeyword(Long keywordId) {
        List<Relation> relationList = relationRepository.findTop8ByKeywordIdOrderByCountDesc(keywordId);
        return relationList.stream()
                .map(FindRelationKeywordResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
