package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FindSocialRequest {
    private String keyword;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
