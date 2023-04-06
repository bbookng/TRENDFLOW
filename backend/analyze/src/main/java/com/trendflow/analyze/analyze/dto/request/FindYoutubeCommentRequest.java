package com.trendflow.analyze.analyze.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindYoutubeCommentRequest {
    private String link;
    private Integer code;
    private Integer page;
    private Integer perPage;
}
