package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.entity.Relation;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FindRelationKeywordResponse {
    private Long keywordId;
    private String keyword;
    private Long relationKeywordId;
    private String relationKeyword;
    private Long count;

    public static FindRelationKeywordResponse fromEntity(Relation relation){
        return FindRelationKeywordResponse.builder()
                .keywordId(relation.getKeywordId())
                .keyword(relation.getKeyword())
                .relationKeywordId(relation.getRelationKeywordId())
                .relationKeyword(relation.getRelationKeyword())
                .count(relation.getCount())
                .build();
    }
}
