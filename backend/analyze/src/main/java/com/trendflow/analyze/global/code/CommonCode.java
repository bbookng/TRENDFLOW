package com.trendflow.analyze.global.code;

public enum CommonCode {
    DAUM_NEWS("DAUM_NEWS"),
    NAVER_NEWS("NAVER_NEWS"),
    NAVER_BLOG("NAVER_BLOG"),
    TWITTER("TWITTER"),

    ARTICLE("ARTICLE"),
    BLOG("BLOG"),
    YOUTUBE("YOUTUBE");

    private String name;

    CommonCode(String name){
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
