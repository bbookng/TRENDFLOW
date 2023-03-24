package com.trendflow.member.global.code;

public enum RoleCode implements BasicCode {
    NORMAL("RL100", "일반 회원"),
    ADMIN("RL200", "관리자");

    private String code;
    private String name;

    @Override
    public String getCode() { return this.code; }
    @Override
    public String getMessage() { return this.name; }

    RoleCode(String code, String name){
        this.code = code;
        this.name = name;
    }
}
