package com.trendflow.keyword.keyword.dto.response;

import com.trendflow.keyword.global.redis.cache.WordCloudKeyword;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindWordCloudResponse {
    private String text;
    private Integer value;

    public static FindWordCloudResponse fromEntity(WordCloudKeyword wordCloudKeyword) {
        return FindWordCloudResponse.builder()
                .text(wordCloudKeyword.getText())
                .value(wordCloudKeyword.getValue())
                .build();
    }

    public static List<FindWordCloudResponse> toList(List<WordCloudKeyword> wordCloudKeywordList) {
        return wordCloudKeywordList.stream()
                .map(FindWordCloudResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
