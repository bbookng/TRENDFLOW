package com.trendflow.keyword.global.redis.cache;

import com.trendflow.keyword.keyword.entity.Keyword;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HotKeyword {
    private String keyword;
    private Integer rank;
    private String type;
    private Integer step;
    private Long mentionCount;

    public static HotKeyword of(Integer rank, Keyword keyword) {
        return HotKeyword.builder()
                .rank(rank)
                .keyword(keyword.getName())
                .mentionCount(keyword.getCount())
                .build();
    }
}
