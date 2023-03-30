package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MentionCountInfo {
    private Integer total;
    private Integer daum;
    private Integer naver;
    private Integer twitter;
}
