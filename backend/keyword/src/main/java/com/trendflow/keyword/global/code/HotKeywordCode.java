package com.trendflow.keyword.global.code;

public enum HotKeywordCode {
    DAY_HOT_KEYWORD("DAY_HOT_KEYWORD"),
    WEEK_HOT_KEYWORD("WEEK_HOT_KEYWORD"),

    TYPE_UP("up"),
    TYPE_DOWN("down"),
    TYPE_NEW("new"),
    TYPE_SAME("same");

    private String code;
    public String getCode() { return this.code; }

    HotKeywordCode(String code){
        this.code = code;
    }
}
