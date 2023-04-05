package com.trendflow.common.global.code;

public enum Code {
    DAUM_NEWS("DAUM_NEWS"),
    NAVER_NEWS("NAVER_NEWS"),
    NAVER_BLOG("NAVER_BLOG"),
    TWITTER("TWITTER"),

    ARTICLE("ARTICLE"),
    BLOG("BLOG"),
    YOUTUBE("YOUTUBE");

    private String code;
    public String getCode() { return this.code; }
    Code(String code){
        this.code = code;
    }
}
