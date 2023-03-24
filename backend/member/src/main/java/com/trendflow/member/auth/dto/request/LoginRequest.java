package com.trendflow.member.auth.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {
    private String platformCode;
    private String authCode;
}
