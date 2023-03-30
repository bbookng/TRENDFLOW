package com.trendflow.analyze.analyze.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompareInfo {
    private CompareInfoVo mention;
    private CompareInfoVo grapeQuotient;
}