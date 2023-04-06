package com.trendflow.analyze.analyze.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SocialMap {
    private Map<LocalDate, MentionCountInfo> keywordCountMap;
    private Map<LocalDate, GrapeQuotientInfo> sentimentCountMap;
}
