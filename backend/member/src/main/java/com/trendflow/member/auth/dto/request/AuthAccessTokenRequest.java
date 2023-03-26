package com.trendflow.member.auth.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthAccessTokenRequest {
    private String accessToken;
}
