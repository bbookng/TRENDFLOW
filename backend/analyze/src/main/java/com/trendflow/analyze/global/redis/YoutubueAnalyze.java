package com.trendflow.analyze.global.redis;

import com.trendflow.analyze.analyze.dto.vo.Payload.AnalyzeResult;
import com.trendflow.analyze.analyze.dto.vo.Payload.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YoutubueAnalyze {
    private String title;
    private String url;
    private Integer viewCount;
    private Integer likeCOunt;
    private Integer commentCount;
    private Double positive;
    private Double negative;
    private Double neutral;
    private String name;
    private Integer subscribeCount;
    private List<Comment> commentList;
    private List<AnalyzeResult> analyzeResultList;
}
