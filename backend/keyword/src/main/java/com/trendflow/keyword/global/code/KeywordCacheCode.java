package com.trendflow.keyword.global.code;

public enum KeywordCacheCode {
    DAY_HOT_KEYWORD("DAY_HOT_KEYWORD"),
    DAY_HOT_KEYWORD_RESULT("DAY_HOT_KEYWORD_RESULT"),
    WEEK_HOT_KEYWORD("WEEK_HOT_KEYWORD"),
    WEEK_HOT_KEYWORD_RESULT("WEEK_HOT_KEYWORD_RESULT"),

    RECOMMEND_KEYWORD("RECOMMEND_KEYWORD"),

    RELATE_KEYWORD("RELATE_KEYWORD"),
    RELATE_KEYWORD_RESULT("RELATE_KEYWORD_RESULT"),

    WORDCLOUD_KEYWORD("WORDCLOUD_KEYWORD"),

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
