package com.trendflow.analyze.msa.dto.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class Source {
    private Long sourceId;
    private String thumbnail;
    private String title;
    private String content;
    private LocalDate date;
    private String link;
}
