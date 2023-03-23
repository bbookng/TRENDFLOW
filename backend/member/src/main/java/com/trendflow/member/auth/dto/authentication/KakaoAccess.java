package com.trendflow.member.auth.dto.authentication;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class KakaoAccess {
    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Integer accessTokenExpire;
    private Integer refreshTokenExpire;
    private List<String> scope;
}
