package com.trendflow.member.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.global.security.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    // 401
    private final TokenAuthenticationEntryPoint tokenAuthenticationEntryPoint;
    // 403
    private final TokenAccessDenineHandler tokenAccessDenineHandler;
    private final CustomUserDetailService customUserDetailService;
    private final ObjectMapper objectMapper;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()

                // 세분화 되어있을수록 위쪽에 위치해야한다.
                .authorizeRequests()
                .antMatchers("/member").permitAll()
                .antMatchers("/member/logout").hasAnyAuthority("RL100", "RL200")
                .antMatchers("/member/auth/refresh").hasAnyAuthority("RL100", "RL200")
                .anyRequest().permitAll()

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(tokenAuthenticationEntryPoint)
                .accessDeniedHandler(tokenAccessDenineHandler)

                .and()
                .logout().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable();

        http.addFilterBefore(new TokenAuthenticationFilter(customUserDetailService), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new TokenAuthenticationExceptionFilter(objectMapper), TokenAuthenticationFilter.class);

        return http.build();
    }

}
