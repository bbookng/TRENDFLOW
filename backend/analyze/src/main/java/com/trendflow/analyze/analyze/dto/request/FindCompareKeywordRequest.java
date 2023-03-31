package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class FindCompareKeywordRequest {
    private String keywordA;
    private String keywordB;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
