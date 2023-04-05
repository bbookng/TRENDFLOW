package com.trendflow.member.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthAccessTokenRequest {
    private String accessToken;
}
