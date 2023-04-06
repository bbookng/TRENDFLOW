package com.trendflow.analyze.msa.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Keyword {
    private Long keywordId;
    private Long sourceId;
    private String platformCode;
    private String keyword;
    private Long count;
    private LocalDate regDt;
}
