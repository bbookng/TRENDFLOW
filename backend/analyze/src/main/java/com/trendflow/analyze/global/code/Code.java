package com.trendflow.analyze.global.code;

public enum Code {

    DAUM_NEWS("DAUM_NEWS"),
    NAVER_NEWS("NAVER_NEWS"),
    NAVER_BLOG("NAVER_BLOG"),
    TWITTER("TWITTER"),

    ARTICLE("ARTICLE"),
    BLOG("BLOG"),
    YOUTUBE("YOUTUBE"),
    DAUM("DAUM"),
    NAVER("NAVER");

    private String name;

    Code(String name){
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
