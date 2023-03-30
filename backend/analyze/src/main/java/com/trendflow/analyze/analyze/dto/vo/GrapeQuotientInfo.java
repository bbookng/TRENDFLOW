package com.trendflow.analyze.analyze.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class GrapeQuotientInfo {
    private Integer positive;
    private Integer negative;
    private Integer neutral;
    public GrapeQuotientInfo() {
        this.positive = 0;
        this.negative = 0;
        this.neutral = 0;
    }
}
