package com.trendflow.member.global.security;

import com.trendflow.member.auth.service.AuthService;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final AuthService authService;
    @Override
    public UserDetails loadUserByUsername(String accessToken) throws UnAuthException, UsernameNotFoundException {
        Member member = authService.authAccessToken(accessToken);
        return CustomUserDetail.of(member);
    }
}
