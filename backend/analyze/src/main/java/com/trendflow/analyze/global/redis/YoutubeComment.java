package com.trendflow.analyze.global.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class YoutubeComment {
    private Integer id;
    private Integer upCount;
    private Integer downCount;
    private String comment;
}
