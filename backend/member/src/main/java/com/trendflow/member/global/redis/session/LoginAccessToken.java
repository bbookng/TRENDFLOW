package com.trendflow.member.global.redis.session;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LoginAccessToken {
    @Id
    private String accessToken;
    private String refreshToken;
    private Long memberId;
    private Long expiration;
    private LocalDateTime expire;
}