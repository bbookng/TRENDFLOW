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
public class FindRelationContentRequest {
    private String keyword;
    private String code;
    private Integer page;
    private Integer perPage;
    private LocalDate startDate;
    private LocalDate endDate;
}
