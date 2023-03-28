package com.trendflow.member.auth.dto.authentication;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialTokenInfo {
    private Long id;
    private Integer expire;
}
