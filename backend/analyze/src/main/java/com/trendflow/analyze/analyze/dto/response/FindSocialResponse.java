package com.trendflow.analyze.analyze.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.analyze.dto.vo.CompareInfo;
import com.trendflow.analyze.analyze.dto.vo.GrapeQuotientInfo;
import com.trendflow.analyze.analyze.dto.vo.MentionCountInfo;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class FindSocialResponse {

    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate date;
    private MentionCountInfo mentionCountInfo;
    private GrapeQuotientInfo grapeQuotientInfo;
    private CompareInfo compareInfo;
}
