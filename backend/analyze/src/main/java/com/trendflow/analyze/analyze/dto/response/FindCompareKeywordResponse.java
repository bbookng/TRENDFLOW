package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.dto.vo.CountCompare;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindCompareKeywordResponse {
    private List<CountCompare> grapeQuotientCompare;
    private List<CountCompare> mentionCountCompare;
}
