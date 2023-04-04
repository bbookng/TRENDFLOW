package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FindCompareKeywordRequest {
    private String keywordA;
    private String keywordB;
    private LocalDate startDate;
    private LocalDate endDate;
}
