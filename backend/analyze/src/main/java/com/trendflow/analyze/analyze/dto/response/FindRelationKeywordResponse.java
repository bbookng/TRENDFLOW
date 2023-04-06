package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.entity.Relation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindRelationKeywordResponse {
    private Long keywordId;
    private String keyword;
    private Long relationKeywordId;
    private String relationKeyword;
    private Long count;

    public static FindRelationKeywordResponse of(Relation relation){
        return FindRelationKeywordResponse.builder()
                .keywordId(relation.getKeywordId())
                .keyword(relation.getKeyword())
                .relationKeywordId(relation.getRelationKeywordId())
                .relationKeyword(relation.getRelationKeyword())
                .count(relation.getCount())
                .build();
    }
}
