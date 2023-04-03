package com.trendflow.common.local.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.common.local.entity.Source;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetSourceRequest {
    private String keyword;
    private List<Long> sourceIdList;
    private String sourceCode;
}
