package com.trendflow.member.auth.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String name;
    private String accessToken;
    private String refreshToken;
}
