package com.trendflow.member.global.redis.session;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RedisRepositoryTest {

    @Autowired
    private LoginAccessTokenRepository loginAccessTokenRepository;
    @Autowired
    private LogoutAccessTokenRepository logoutAccessTokenRepository;

    @Test
    @Transactional
    void redisSessionTest() {
        loginAccessTokenRepository.saveLogin(LoginAccessToken.builder()
                .accessToken("accessTokenTest")
                .refreshToken("refreshTokenTest")
                .memberId(100L)
                .accessTokenExpire(60)
                .refreshTokenExpire(120)
                .build());

        LoginAccessToken loginAccessToken = loginAccessTokenRepository.findById("").get();
        assertEquals(loginAccessToken.getAccessExpire().getClass().getName(), "java.time.LocalDateTime");
    }

    @Test
    @Transactional
    void redisCacheTest() {
    }
}