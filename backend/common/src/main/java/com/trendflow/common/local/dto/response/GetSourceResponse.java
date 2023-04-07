package com.trendflow.common.local.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.common.local.entity.Source;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class GetSourceResponse {
    private String platformCode;
    private String thumbnail;
    private String title;
    private String desc;
    private LocalDate date;
    private String link;

    public static GetSourceResponse of(Source source) {
        return GetSourceResponse.builder()
                .platformCode(source.getPlatformCode())
                .thumbnail(source.getThumbImg())
                .title(source.getTitle())
                .desc(source.getContent())
                .date(source.getRegDt())
                .link(source.getLink())
                .build();
    }

    public static List<GetSourceResponse> toList(List<Source> sourceList) {
        return sourceList.stream()
                .map(GetSourceResponse::of)
                .collect(Collectors.toList());
    }
}
