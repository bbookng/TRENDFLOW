package com.trendflow.analyze.global.code;

public enum SocialCacheCode {
    TYPE_UP("up"),
    TYPE_DOWN("down"),
    TYPE_NEW("new"),
    TYPE_SAME("same");

    private String code;
    public String getCode() { return this.code; }

    SocialCacheCode(String code){
        this.code = code;
    }
}
