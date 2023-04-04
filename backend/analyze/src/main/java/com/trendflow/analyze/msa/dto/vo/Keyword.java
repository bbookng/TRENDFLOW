package com.trendflow.analyze.msa.dto.vo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class Keyword {
    private Long keywordId;
    private Long sourceId;
    private String platformCode;
    private String keyword;
    private Long count;
    private LocalDate regDt;
}
