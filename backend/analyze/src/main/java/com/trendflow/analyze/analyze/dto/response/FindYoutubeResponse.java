package com.trendflow.analyze.analyze.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FindYoutubeResponse {
    private String title;
    private String url;
    private Reaction reaction;
    private AffinityInfo affinityInfo;
    private Owner owner;

    @Data
    @Builder
    public static class Reaction {
        private Integer viewCount;
        private Integer likeCount;
        private Integer commentCount;
    }

    @Data
    @Builder
    public static class AffinityInfo {
        private Double positive;
        private Double negative;
        private Double neutral;
    }

    @Data
    @Builder
    public static class Owner {
        private String name;
        private Integer subscribeCount;
    }
}