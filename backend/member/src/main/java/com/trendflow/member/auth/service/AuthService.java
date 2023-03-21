package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.authentication.KakaoUser;
import com.trendflow.member.auth.dto.request.LoginRequest;
import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.dto.authentication.KakaoAccess;
import com.trendflow.member.global.code.PlatformCode;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final KakaoAuthService kakaoAuthService;

    private final String KakaoCode = PlatformCode.KAKAO.getCode();
    private final String GoogleCode = PlatformCode.GOOGLE.getCode();

    public LoginResponse login(LoginRequest loginRequest) throws RuntimeException {

        final String platformCode = loginRequest.getPlatformCode();
        final String authCode = loginRequest.getAuthCode();

        if (KakaoCode.equals(platformCode)){
            // accessToken 발급
            KakaoAccess kakaoAccess = kakaoAuthService.getAccessToken(authCode);
            // accessToken 으로 카카오 사용자 정보 수집
            KakaoUser kakaoUser = kakaoAuthService.getUser(kakaoAccess.getAccessToken());
            // 카카오 사용자 정보를 통해 회원가입 여부 확인 (by Email)
            // 회원가입이 되어있으면 DB Member 반환
            // 회원가입이 안되어있으면 DB 에 등록 이후 Member 반환
            Member member = kakaoAuthService.getMember();

            
            return LoginResponse.builder()
                    .
                    .build();

        } else if (GoogleCode.equals(platformCode)){

            return null;

        } else throw new UnAuthException();
    }
}
