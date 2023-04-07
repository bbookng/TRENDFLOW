package com.trendflow.analyze.analyze.dto.request;

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
public class FindSocialRequest {
    private String keyword;
    private LocalDate startDate;
    private LocalDate endDate;
}
