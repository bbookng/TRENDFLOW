package com.trendflow.member.global.redis.session;

import lombok.*;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LoginRefreshToken {
    @Id
    private String refreshToken;
    private Integer refreshTokenExpire;
    private LocalDateTime refreshExpire;
    private String accessToken;
    private Integer accessTokenExpire;
    private LocalDateTime accessExpire;
    private Long memberId;
    private String platformCode;
    private String platformUserId;
}