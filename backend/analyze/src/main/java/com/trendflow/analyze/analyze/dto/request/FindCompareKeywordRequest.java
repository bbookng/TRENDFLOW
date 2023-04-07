package com.trendflow.analyze.analyze.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindCompareKeywordRequest {
    private String keywordA;
    private String keywordB;
    private LocalDate startDate;
    private LocalDate endDate;
}
