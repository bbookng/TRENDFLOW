package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.dto.vo.CountCompare;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindCompareKeywordResponse {
    private List<CountCompare> grapeQuotientCompare;
    private List<CountCompare> mentionCountCompare;
}
