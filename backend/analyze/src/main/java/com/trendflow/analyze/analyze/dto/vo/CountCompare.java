package com.trendflow.analyze.analyze.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CountCompare {
    private LocalDate date;
    private String keyword1;
    private String keyword2;
    private String type;
    private Integer difference;
}
