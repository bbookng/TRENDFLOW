package com.trendflow.analyze.msa.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GetSourceRequest {
    private List<Long> sourceIdList;
}
