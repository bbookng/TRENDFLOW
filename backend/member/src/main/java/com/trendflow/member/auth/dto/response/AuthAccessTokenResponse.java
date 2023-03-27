package com.trendflow.member.auth.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthAccessTokenResponse {
    private Boolean isValid;
}
