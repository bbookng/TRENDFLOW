package com.trendflow.analyze.analyze.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindYoutubeCommentRequest {
    private String link;
    private Integer code;
    private Integer page;
    private Integer perPage;
}
