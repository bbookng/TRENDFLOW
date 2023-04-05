package com.trendflow.member.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthAccessTokenResponse {
    private Boolean isValid;
}
