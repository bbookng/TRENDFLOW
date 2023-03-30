package com.trendflow.keyword.msa.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Relation {
    private Long keywordId;
    private String keyword;
    private Long relationKeywordId;
    private String relationKeyword;
    private Long count;
}
