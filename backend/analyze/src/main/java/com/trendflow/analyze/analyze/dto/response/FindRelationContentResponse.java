package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindRelationContentResponse {
    private List<Source> article;
    private List<Source> blog;
    private List<Source> youtube;
}
