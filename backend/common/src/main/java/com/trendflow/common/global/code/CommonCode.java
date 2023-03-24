package com.trendflow.common.global.code;

public enum CommonCode implements BasicCode {
    SUCCESS("200", "공통 기능 성공"),
    FAIL("400", "공통 기능 오류");

    private String code;
    private String message;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.message; }

    CommonCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
