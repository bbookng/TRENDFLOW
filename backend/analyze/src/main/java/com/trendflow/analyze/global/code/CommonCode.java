package com.trendflow.analyze.global.code;

public enum CommonCode {
    DAUM_NEWS("DAUM_NEWS"),
    NAVER_NEWS("NAVER_NEWS"),
    NAVER_BLOG("NAVER_BLOG"),
    TWITTER("TWITTER");

    private String name;

    CommonCode(String name){
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
