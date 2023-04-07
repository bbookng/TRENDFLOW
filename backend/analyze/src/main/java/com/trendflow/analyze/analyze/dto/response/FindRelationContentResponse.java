package com.trendflow.analyze.analyze.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindRelationContentResponse {
    private Long id;
    private String social;
    private String code;
    private String thumbnail;
    private String title;
    private String desc;
    @JsonFormat(pattern = "yyyy-MM-dd", shape = JsonFormat.Shape.STRING)
    private LocalDate date;
    private String link;

    public static FindRelationContentResponse of(Long id, String social, String code, Source source){
        return FindRelationContentResponse.builder()
                .id(id)
                .social(social)
                .code(code)
                .thumbnail(source.getThumbnail())
                .title(source.getTitle())
                .desc(source.getDesc())
                .date(source.getDate())
                .link(source.getLink())
                .build();
    }

    public static List<FindRelationContentResponse> toList(String social, String code, List<Source> sourceList) {
        AtomicLong id = new AtomicLong();
        return sourceList.stream()
                .map(source ->
                        FindRelationContentResponse.of(id.getAndIncrement() + 1, social, code, source))
                .collect(Collectors.toList());
    }
}
