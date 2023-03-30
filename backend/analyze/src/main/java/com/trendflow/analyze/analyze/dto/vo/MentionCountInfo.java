package com.trendflow.analyze.analyze.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class MentionCountInfo {
    private Integer total;
    private Integer daum;
    private Integer naver;
    private Integer twitter;
    public MentionCountInfo() {
        this.total = 0;
        this.daum = 0;
        this.naver = 0;
        this.twitter = 0;
    }
}
