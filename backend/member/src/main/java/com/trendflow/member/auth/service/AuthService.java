package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.authentication.KakaoUser;
import com.trendflow.member.auth.dto.request.LoginRequest;
import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.dto.authentication.KakaoAccess;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.code.PlatformCode;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final KakaoAuthService kakaoAuthService;

    public LoginResponse login(LoginRequest loginRequest) throws RuntimeException {

        final String platformCode = loginRequest.getPlatformCode();
        final String authCode = loginRequest.getAuthCode();

        LoginResponse loginResponse = null;
        
        // 카카오 소셜 로그인
        if (PlatformCode.KAKAO.getCode().equals(platformCode)){
            // accessToken 발급
            KakaoAccess kakaoAccess = kakaoAuthService.getAccessToken(authCode);
            // accessToken 으로 카카오 사용자 정보 수집
            KakaoUser kakaoUser = kakaoAuthService.getUser(kakaoAccess.getAccessToken());
            // 카카오 사용자 정보를 통해 회원가입 여부 확인 (by Email)
            // 회원가입이 되어있으면 DB Member 반환
            // 회원가입이 안되어있으면 DB 에 등록 이후 Member 반환
            Member member = kakaoAuthService.getMember(kakaoUser);
            
            loginResponse = LoginResponse.builder()
                            .name(member.getName())
                            .accessToken(kakaoAccess.getAccessToken())
                            .refreshToken(kakaoAccess.getRefreshToken())
                            .build();
        } 
        // 구글 소셜 로그인
        else if (PlatformCode.GOOGLE.getCode().equals(platformCode)){

            return null;
        } 
        // 플랫폼 코드 인식 불가
        else throw new UnAuthException(AuthCode.PLATFORM_FAIL);
    
        // 레디스에 접속 로그 남기기
        
        // DB에 접속 로그 남기기

        return loginResponse;
    }

    public void logout(String accessToken, String refreshToken) {
        // 레디스에 accessToken 유무 확인


        // 레디스에 접속 해제 로그 남기기

        // DB에 접속 해제 로그 남기기
    }
}
