package com.trendflow.keyword.global.code;

public enum KeywordCode implements BasicCode {
    SUCCESS("200", "키워드 기능 성공"),
    FAIL("400", "키워드 기능 오류");

    private String code;
    private String message;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.message; }

    KeywordCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
