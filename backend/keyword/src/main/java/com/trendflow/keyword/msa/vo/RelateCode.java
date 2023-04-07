package com.trendflow.keyword.msa.vo;

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
