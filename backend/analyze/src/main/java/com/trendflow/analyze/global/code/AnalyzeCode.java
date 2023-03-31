package com.trendflow.analyze.global.code;

public enum AnalyzeCode implements BasicCode {
    SUCCESS("200", "분석 기능 성공"),

    DATA_FOUND_FAIL("401", "데이터 조회 실패"),

    FAIL("400", "분석 기능 오류");

    private String code;
    private String message;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.message; }

    AnalyzeCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
