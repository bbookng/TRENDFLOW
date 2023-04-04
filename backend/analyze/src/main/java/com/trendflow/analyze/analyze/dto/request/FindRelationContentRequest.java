package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FindRelationContentRequest {
    private String keyword;
    private String code;
    private Integer page;
    private Integer perPage;
    private LocalDate startDate;
    private LocalDate endDate;
}
