package com.trendflow.keyword.global.redis.cache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RecommendKeyword {
    private Long id;
    private String keyword;
}
