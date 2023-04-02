package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CountCompare {
    private LocalDate date;
    private String keyword1;
    private String keyword2;
    private String type;
    private Integer difference;
}
