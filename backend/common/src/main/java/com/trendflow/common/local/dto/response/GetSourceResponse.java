package com.trendflow.common.local.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.common.local.entity.Source;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class GetSourceResponse {
    private String thumbnail;
    private String title;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDateTime date;
    private String link;

    public static GetSourceResponse of(Source source) {
        return GetSourceResponse.builder()
                .thumbnail(source.getThumbImg())
                .title(source.getTitle())
                .content(source.getContent())
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
