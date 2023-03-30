package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompareInfo {
    private CompareInfoVo mention;
    private CompareInfoVo grapeQuotient;
}