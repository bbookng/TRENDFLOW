package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class FindSocialRequest {
    private String keyword;
    private LocalDate startDate;
    private LocalDate endDate;
}
