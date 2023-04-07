package com.trendflow.member.global.code;

import lombok.ToString;

public enum AuthCode implements BasicCode {
    SUCCESS("200", "인증 기능 성공"),

    FAIL("400", "인증 기능 서버 오류"),
    PLATFORM_FAIL("401", "플랫폼 입력 오류"),
    SEARCH_TOKEN_FAIL("402", "등록되지 않은 토큰"),
    INVALID_TOKEN_FAIL("403", "유효하지 않은 토큰"),
    SEARCH_REFRESH_TOKEN_FAIL("404", "리프레시 토큰 없음. 재로그인 필요"),
    NOT_HAVE_ACCESS_TOKEN("405", "엑세스 토큰 없음"),
    FORBIDDEN_FAIL("406", "접근 권한 없음"),

    KAKAO_GET_TOKEN_FAIL("411", "카카오 토큰 발급 실패"),
    KAKAO_GET_USER_FAIL("412", "카카오 회원정보 조회 실패"),
    KAKAO_AUTH_TOKEN_FAIL("413", "카카오 토큰 유효성 확인 실패"),
    KAKAO_LOGOUT_FAIL("414", "카카오 로그아웃 실패"),

    GOOGLE_GET_TOKEN_FAIL("421", "구글 토큰 발급 실패"),
    GOOGLE_GET_USER_FAIL("422", "구글 회원정보 조회 실패"),
    GOOGLE_AUTH_TOKEN_FAIL("423", "구글 토큰 유효성 확인 실패"),
    GOOGLE_LOGOUT_FAIL("424", "구글 로그아웃 실패");

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