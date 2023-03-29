package com.trendflow.keyword.global.code;

public enum KeywordCacheCode {
    DAY_HOT_KEYWORD("DAY_HOT_KEYWORD"),
    DAY_HOT_KEYWORD_RESULT("DAY_HOT_KEYWORD_RESULT"),
    WEEK_HOT_KEYWORD("WEEK_HOT_KEYWORD"),
    WEEK_HOT_KEYWORD_RESULT("WEEK_HOT_KEYWORD_RESULT"),

    RELATE_KEYWORD("RELATE_KEYWORD"),
    RELATE_KEYWORD_RESULT("RELATE_KEYWORD_RESULT"),

    TYPE_UP("up"),
    TYPE_DOWN("down"),
    TYPE_NEW("new"),
    TYPE_SAME("same");

    private String code;
    public String getCode() { return this.code; }

    KeywordCacheCode(String code){
        this.code = code;
    }
}
