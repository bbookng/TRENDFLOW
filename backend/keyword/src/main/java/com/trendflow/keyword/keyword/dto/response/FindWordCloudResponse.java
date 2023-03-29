package com.trendflow.keyword.keyword.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindWordCloudResponse {
    private String text;
    private Integer value;
}
