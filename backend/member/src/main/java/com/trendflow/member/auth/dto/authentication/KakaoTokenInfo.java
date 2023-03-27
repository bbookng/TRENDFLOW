package com.trendflow.member.auth.dto.authentication;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoTokenInfo {
    private Long id;
    private Integer expire;
    private Integer appId;
}
