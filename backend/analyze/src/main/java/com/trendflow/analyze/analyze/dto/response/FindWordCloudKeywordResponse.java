package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.entity.Relation;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindWordCloudKeywordResponse {
    private Long keywordId;
    private String keyword;
    private Long relationKeywordId;
    private String relationKeyword;
    private Long count;

    public static FindWordCloudKeywordResponse fromEntity(Relation relation){
        return FindWordCloudKeywordResponse.builder()
                .keywordId(relation.getKeywordId())
                .keyword(relation.getKeyword())
                .relationKeywordId(relation.getRelationKeywordId())
                .relationKeyword(relation.getRelationKeyword())
                .count(relation.getCount())
                .build();
    }
}
