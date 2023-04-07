package com.trendflow.member.global.code;

public enum CommonCode {
    ANON_USER("ANON_USER"), NORMAL_USER("NORMAL_USER"), ADMIN("ADMIN"),
    KAKAO("KAKAO"), GOOGLE("GOOGLE");

    private String name;

    CommonCode(String name){
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
