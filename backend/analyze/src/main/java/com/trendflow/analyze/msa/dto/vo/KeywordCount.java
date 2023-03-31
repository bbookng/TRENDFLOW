package com.trendflow.analyze.msa.dto.vo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class KeywordCount {
    private String platformCode;
    private Long count;
    private LocalDate regDt;
}
