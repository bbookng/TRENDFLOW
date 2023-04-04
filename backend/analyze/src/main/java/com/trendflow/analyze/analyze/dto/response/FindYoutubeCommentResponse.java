package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.global.redis.YoutubeComment;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindYoutubeCommentResponse {
    private Integer id;
    private Integer upCount;
    private Integer downCount;
    private String comment;

    public static FindYoutubeCommentResponse of(YoutubeComment youtubeComment) {
        return FindYoutubeCommentResponse.builder()
                .id(youtubeComment.getId())
                .upCount(youtubeComment.getUpCount())
                .downCount(youtubeComment.getDownCount())
                .comment(youtubeComment.getComment())
                .build();
    }

    public static List<FindYoutubeCommentResponse> toList(List<YoutubeComment> youtubeCommentList) {
        return youtubeCommentList.stream()
                .map(FindYoutubeCommentResponse::of)
                .collect(Collectors.toList());
    }
}
