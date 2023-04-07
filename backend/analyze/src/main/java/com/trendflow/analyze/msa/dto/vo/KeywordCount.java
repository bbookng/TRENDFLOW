package com.trendflow.analyze.msa.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KeywordCount {
    private String platformCode;
    private Long count;
    private LocalDate regDt;
}
