package com.trendflow.analyze.analyze.dto.vo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Map;

@Data
@Builder
public class SocialMap {
    private Map<LocalDate, MentionCountInfo> keywordCountMap;
    private Map<LocalDate, GrapeQuotientInfo> sentimentCountMap;
}
