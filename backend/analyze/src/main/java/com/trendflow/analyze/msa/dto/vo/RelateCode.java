package com.trendflow.analyze.msa.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RelateCode {
    private String code;
    private String platformCode;
}
