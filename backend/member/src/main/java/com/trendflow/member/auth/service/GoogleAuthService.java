package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.authentication.GoogleUser;
import com.trendflow.member.auth.dto.authentication.KakaoTokenInfo;
import com.trendflow.member.auth.dto.authentication.SocialAccess;
import com.trendflow.member.auth.dto.authentication.SocialUser;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleAuthService {
    @Value("${login.google.client-id}")
    private String ClientId;
    @Value("${login.google.client-secret}")
    private String ClientSecret;
    @Value("${login.google.redirect-uri}")
    private String RedirectUri;
    @Value("${login.google.token-issuance-uri}")
    private String GoogleTokenIssuanceUri;
    @Value("${login.google.token-reissue-uri}")
    private String GoogleReissueUri;
    @Value("${login.google.token-expire-uri}")
    private String GoogleExpireUri;
    @Value("${login.google.token-auth-uri}")
    private String GoogleAuthUri;
    @Value("${login.google.info-uri}")
    private String GoogleInfoUri;

    public SocialAccess getAccessToken(String authCode) throws UnAuthException {
        return null;
    }

    public SocialAccess refreshAccessToken(String refreshToken, Integer refreshTokenExpire) throws UnAuthException {
        return null;
    }

    public KakaoTokenInfo authAccessToken(String accessToken) throws UnAuthException {
        return null;
    }

    public Long expireToken(String refreshToken) throws UnAuthException {
        return null;
    }

    public SocialUser getUser(String accessToken) throws UnAuthException {
        return null;
    }

    public Member getMember(SocialUser socialUser) throws RuntimeException {
        return null;
    }

}
