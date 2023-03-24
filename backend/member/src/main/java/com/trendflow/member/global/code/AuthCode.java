package com.trendflow.member.global.code;

public enum AuthCode implements BasicCode {
    SUCCESS("200", "인증 기능 성공"),
    KAKAO_GET_TOKEN_FAIL("411", "카카오 토큰 발급 실패"),
    KAKAO_GET_USER_FAIL("412", "카카오 회원정보 조회 실패"),
    PLATFORM_FAIL("401", "플랫폼 입력 오류"),
    FAIL("400", "인증 기능 서버 오류");

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