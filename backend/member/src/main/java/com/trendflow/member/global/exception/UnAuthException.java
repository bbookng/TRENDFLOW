package com.trendflow.member.global.exception;

import com.trendflow.member.global.code.BasicCode;

public class UnAuthException extends RuntimeException {
    BasicCode code;
    public UnAuthException() {}
    public UnAuthException(BasicCode basicCode) {
        this.code = basicCode;
    }
    public BasicCode getCode(){ return this.code; }
}
