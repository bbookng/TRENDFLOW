package com.trendflow.member.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String name;
    private String accessToken;
    private String refreshToken;
}
