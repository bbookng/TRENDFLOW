package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GrapeQuotientInfo {
    private Integer positive;
    private Integer negative;
    private Integer neutral;
}
