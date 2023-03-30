package com.trendflow.analyze.global.redis;

import com.trendflow.analyze.analyze.dto.vo.CompareInfo;
import com.trendflow.analyze.analyze.dto.vo.GrapeQuotientInfo;
import com.trendflow.analyze.analyze.dto.vo.MentionCountInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Social {
    private MentionCountInfo mentionCountInfo;
    private GrapeQuotientInfo grapeQuotientInfo;
    private CompareInfo compareInfo;
}
