package com.trendflow.keyword.keyword.dto.response;

import com.trendflow.keyword.global.redis.RelateKeyword;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindRelateKeywordResponse {
    private Integer rank;
    private String keyword;
    private String type;
    private Integer step;
    private Long relatedCount;

    public static FindRelateKeywordResponse fromEntity(RelateKeyword relateKeyword) {
        return FindRelateKeywordResponse.builder()
                .rank(relateKeyword.getRank())
                .keyword(relateKeyword.getKeyword())
                .type(relateKeyword.getType())
                .step(relateKeyword.getStep())
                .relatedCount(relateKeyword.getRelatedCount())
                .build();
    }

    public static List<FindRelateKeywordResponse> toList(List<RelateKeyword> relateKeywordList) {
        return relateKeywordList.stream()
                .map(FindRelateKeywordResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
