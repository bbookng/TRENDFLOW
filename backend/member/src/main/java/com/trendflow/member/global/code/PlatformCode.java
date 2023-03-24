package com.trendflow.member.global.code;

public enum PlatformCode implements BasicCode {
    KAKAO("PL100", "카카오"),
    GOOGLE("PL100", "구글");

    private String code;
    private String name;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.name; }

    PlatformCode(String code, String name){
        this.code = code;
        this.name = name;
    }
}
