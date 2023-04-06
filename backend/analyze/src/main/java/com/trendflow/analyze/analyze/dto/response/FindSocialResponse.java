package com.trendflow.analyze.analyze.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.analyze.dto.vo.CompareInfo;
import com.trendflow.analyze.analyze.dto.vo.GrapeQuotientInfo;
import com.trendflow.analyze.analyze.dto.vo.MentionCountInfo;

import com.trendflow.analyze.global.redis.Social;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindSocialResponse {
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate date;
    private MentionCountInfo mentionCountInfo;
    private GrapeQuotientInfo grapeQuotientInfo;
    private CompareInfo compareInfo;

    public static FindSocialResponse of(Social social) {
        return FindSocialResponse.builder()
                .date(social.getDate())
                .mentionCountInfo(social.getMentionCountInfo())
                .grapeQuotientInfo(social.getGrapeQuotientInfo())
                .compareInfo(social.getCompareInfo())
                .build();
    }

    public static List<FindSocialResponse> toList(List<Social> socialList) {
        return socialList.stream()
                .map(FindSocialResponse::of)
                .collect(Collectors.toList());
    }
}
