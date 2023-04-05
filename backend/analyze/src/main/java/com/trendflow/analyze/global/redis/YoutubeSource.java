package com.trendflow.analyze.global.redis;

import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
public class YoutubeSource {
    private String thumbnail;
    private String title;
    private String content;
    private LocalDate date;
    private String link;

    public static YoutubeSource of(Source source) {
        return YoutubeSource.builder()
                .thumbnail(source.getThumbnail())
                .title(source.getTitle())
                .content(source.getDesc())
                .date(source.getDate())
                .link(source.getLink())
                .build();
    }

    public static List<YoutubeSource> toList(List<Source> sourceList) {
        return sourceList.stream()
                .map(YoutubeSource::of)
                .collect(Collectors.toList());
    }

}
