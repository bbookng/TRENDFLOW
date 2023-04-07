package com.trendflow.member.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenAccessDenineHandler implements AccessDeniedHandler {
    private final ObjectMapper objectMapper;
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        log.error("TokenAccessDenineHandler - Call");
        setErrorResponse(HttpStatus.FORBIDDEN, response);
        response.getWriter().write(objectMapper.writeValueAsString(BasicResponse.Body(AuthCode.FORBIDDEN_FAIL, null)));
    }
    private void setErrorResponse(HttpStatus status, HttpServletResponse response)  {
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
    }
}
