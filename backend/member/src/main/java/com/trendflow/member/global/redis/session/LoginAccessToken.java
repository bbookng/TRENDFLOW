package com.trendflow.member.global.redis.session;

import lombok.*;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LoginAccessToken {
    @Id
    private String accessToken;
    private Integer accessTokenExpire;
    private LocalDateTime accessExpire;
    private String refreshToken;
    private Integer refreshTokenExpire;
    private LocalDateTime refreshExpire;
    private Long memberId;
    private String platformCode;
    private Long platformUserId;
    private Boolean isValid;
}