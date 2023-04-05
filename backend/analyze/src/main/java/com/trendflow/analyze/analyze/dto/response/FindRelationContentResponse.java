package com.trendflow.analyze.analyze.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindRelationContentResponse {
    private Long id;
    private String title;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate date;
    private String link;

    public static FindRelationContentResponse of(Source source) {
        return FindRelationContentResponse.builder()
                .id(source.getSourceId())
                .title(source.getTitle())
                .content(source.getTitle())
                .date(source.getDate())
                .link(source.getLink())
                .build();
    }

    public static List<FindRelationContentResponse> toList(List<Source> sourceList) {
        return sourceList.stream()
                .map(FindRelationContentResponse::of)
                .collect(Collectors.toList());
    }
}
