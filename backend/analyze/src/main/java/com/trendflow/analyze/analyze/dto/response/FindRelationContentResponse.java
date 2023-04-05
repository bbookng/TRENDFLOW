package com.trendflow.analyze.analyze.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Data
@Builder
public class FindRelationContentResponse {
    private Long id;
    private String social;
    private String code;
    private String title;
    private String desc;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate date;
    private String link;

    public static List<FindRelationContentResponse> toList(String code, List<Source> sourceList) {
        AtomicLong id = new AtomicLong();
        return sourceList.stream()
                .map(source ->
                        FindRelationContentResponse.builder()
                                .id(id.getAndIncrement() + 1)
                                .social(source.getSocial())
                                .code(code)
                                .title(source.getTitle())
                                .desc(source.getDesc())
                                .date(source.getDate())
                                .link(source.getLink())
                                .build())
                .collect(Collectors.toList());
    }
}
