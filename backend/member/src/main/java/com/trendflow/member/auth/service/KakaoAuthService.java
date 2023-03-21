package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.authentication.KakaoAccess;
import com.trendflow.member.auth.dto.authentication.KakaoUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    public KakaoAccess getAccessToken(String authCode){

    }

    public KakaoUser getUser(String accessToken) {
    }
}
