package com.trendflow.member.global.redis.session;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RedisRepositoryTest {

    @Autowired
    private LoginRefreshTokenRepository loginRefreshTokenRepository;

    @Test
    @Transactional
    void redisSessionTest() {
        loginRefreshTokenRepository.saveLogin(LoginRefreshToken.builder()
                .accessToken("accessTokenTest")
                .refreshToken("refreshTokenTest")
                .memberId(100L)
                .accessTokenExpire(60)
                .refreshTokenExpire(120)
                .build());

        LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById("").get();
        assertEquals(loginRefreshToken.getAccessExpire().getClass().getName(), "java.time.LocalDateTime");
    }

    @Test
    @Transactional
    void redisCacheTest() {
    }
}