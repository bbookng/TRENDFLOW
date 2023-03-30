package com.trendflow.keyword.keyword.dto.response;

import com.trendflow.keyword.global.redis.RecommendKeyword;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindRecommendKeywordResponse {
    private Long id;
    private String keyword;

    public static FindRecommendKeywordResponse fromEntity(RecommendKeyword recommendKeyword) {
        return FindRecommendKeywordResponse.builder()
                .id(recommendKeyword.getId())
                .keyword(recommendKeyword.getKeyword())
                .build();
    }

    public static List<FindRecommendKeywordResponse> toList(List<RecommendKeyword> recommendKeywordList) {
        return recommendKeywordList.stream()
                .map(FindRecommendKeywordResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
