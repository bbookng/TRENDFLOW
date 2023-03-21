package com.trendflow.member.global.code;

public enum AuthCode implements BasicCode {
    SUCCESS("200", "인증 기능 성공"),
    FAIL("400", "인증 기능 오류");

    private String code;
    private String message;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.message; }

    AuthCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}