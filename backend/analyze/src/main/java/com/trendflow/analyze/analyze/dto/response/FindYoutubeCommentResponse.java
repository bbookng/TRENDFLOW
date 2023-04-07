package com.trendflow.analyze.analyze.dto.response;

import com.trendflow.analyze.analyze.dto.vo.Payload;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindYoutubeCommentResponse {
    private String id;
    private Integer upCount;
    private Integer downCount;
    private String comment;

    public static FindYoutubeCommentResponse of (Payload.Comment comment) {
        return FindYoutubeCommentResponse.builder()
                .id(comment.getId())
                .upCount(comment.getLikes())
                .downCount(comment.getDislikes())
                .comment(comment.getComments())
                .build();
    }

    public static List<FindYoutubeCommentResponse> toList(List<Payload.Comment> commentList) {
        return commentList.stream()
                .map(FindYoutubeCommentResponse::of)
                .collect(Collectors.toList());
    }
}
