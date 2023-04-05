package com.trendflow.analyze.analyze.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindYoutubeCommentResponse {
    private Integer id;
    private Integer upCount;
    private Integer downCount;
    private String comment;
}
