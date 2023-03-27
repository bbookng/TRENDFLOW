package com.trendflow.member.global.redis.session;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Id;

@Data
@Builder
@AllArgsConstructor
public class LoginMember {
    @Id
    private String refreshToken;
    private String accessToken;
    private Long memberId;
}
