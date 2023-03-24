package com.trendflow.member.global.redis.session;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class LogoutAccessToken {
    @Id
    private String accessToken;
    private Long memberId;
    private Long expiration;
    private LocalDateTime expire;
}

