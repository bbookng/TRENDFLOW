package com.trendflow.common.global.code;

public enum PlatformCode {
    DAUM_NEWS("DAUM_NEWS"),
    NAVER_NEWS("NAVER_NEWS"),
    NAVER_BLOG("NAVER_BLOG"),
    TWITTER("TWITTER"),

    ARTICLE("ARTICLE"),
    BLOG("BLOG"),
    YOUTUBE("YOUTUBE");

    private String code;
    public String getCode() { return this.code; }
    PlatformCode(String code){
        this.code = code;
    }
}
