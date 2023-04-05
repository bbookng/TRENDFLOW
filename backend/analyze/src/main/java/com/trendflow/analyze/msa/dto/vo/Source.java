package com.trendflow.analyze.msa.dto.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trendflow.analyze.global.code.Code;
import com.trendflow.analyze.global.redis.YoutubeSource;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class Source {
    private String platformCode;
    private String thumbnail;
    private String title;
    private String desc;
    private LocalDate date;
    private String link;

    public static Source of(YoutubeSource youtubeSource) {
        return Source.builder()
                .platformCode("SU600")
                .thumbnail(youtubeSource.getThumbnail())
                .title(youtubeSource.getTitle())
                .desc(youtubeSource.getContent())
                .date(youtubeSource.getDate())
                .link(youtubeSource.getLink())
                .build();
    }

    public static List<Source> toList(List<YoutubeSource> youtubeSourceList) {
        return youtubeSourceList.stream()
                .map(Source::of)
                .collect(Collectors.toList());
    }
}
