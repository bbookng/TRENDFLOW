package com.trendflow.keyword.keyword.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindRecommendKeywordResponse {
    private Long id;
    private String keyword;
}
