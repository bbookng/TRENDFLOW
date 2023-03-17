package com.trendflow.api.global.code;

public enum ErrorCode implements BasicCode {
    FAIL("400", "실패");

    private String code;
    private String message;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.message; }

    ErrorCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
