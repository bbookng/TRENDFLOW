package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindCompareKeywordRequest {
    private String keywordA;
    private String keywordB;
}
