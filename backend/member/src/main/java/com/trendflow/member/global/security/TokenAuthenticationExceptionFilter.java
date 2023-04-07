package com.trendflow.member.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 토큰은 있는데 만료된 경우, 서버 내부 에러
@Slf4j
@Component
@RequiredArgsConstructor
public class TokenAuthenticationExceptionFilter extends GenericFilterBean {
    private final ObjectMapper objectMapper;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (UnAuthException e) {
            log.error("TokenAuthenticationExceptionFilter - UnAuthException");
            setErrorResponse(HttpStatus.UNAUTHORIZED, (HttpServletResponse) response);
            response.getWriter().write(objectMapper.writeValueAsString(BasicResponse.Body(e.getCode(), null)));
        } catch (RuntimeException e) {
            log.error("TokenAuthenticationExceptionFilter - RuntimeException");
            setErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, (HttpServletResponse) response);
            response.getWriter().write(objectMapper.writeValueAsString(BasicResponse.Body(AuthCode.FAIL, null)));
        }
    }
    private void setErrorResponse(HttpStatus status, HttpServletResponse response)  {
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
    }
}
