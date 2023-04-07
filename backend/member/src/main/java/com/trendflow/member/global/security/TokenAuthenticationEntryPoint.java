package com.trendflow.member.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 인증이 필요하지만 토큰이 없는 경우
@Slf4j
@Component
@RequiredArgsConstructor
public class TokenAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        log.error("TokenAuthenticationEntryPoint - Call");
        setErrorResponse(HttpStatus.UNAUTHORIZED, response);
        response.getWriter().write(objectMapper.writeValueAsString(BasicResponse.Body(AuthCode.NOT_HAVE_ACCESS_TOKEN, null)));
    }
    private void setErrorResponse(HttpStatus status, HttpServletResponse response)  {
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
    }
}
