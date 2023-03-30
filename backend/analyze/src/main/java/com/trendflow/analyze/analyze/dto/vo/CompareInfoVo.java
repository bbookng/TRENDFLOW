package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
class CompareInfoVo {
    private String type;
    private Integer changed;
}
