package com.trendflow.member.global.redis.session;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LoginAccessToken {
    @Id
    private String accessToken;
    private LocalDateTime accessExpire;
    private String refreshToken;
    private Long memberId;
    private Boolean isValid;
}
