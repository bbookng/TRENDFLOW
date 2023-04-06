package com.trendflow.analyze.analyze.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FindYoutubeCommentResponse {
    private Integer id;
    private Integer upCount;
    private Integer downCount;
    private String comment;
}
