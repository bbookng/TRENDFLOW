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
        loginAccessTokenRepository.save(LoginAccessToken.builder()
                .accessToken("accessTokenTest")
                .refreshToken("refreshTokenTest")
                .memberId(100L)
                .expiration(10000L)
                .build());

        LoginAccessToken loginAccessToken = loginAccessTokenRepository.findById("accessTokenTest").get();
        assertEquals(loginAccessToken.getExpire().getClass().getName(), "java.time.LocalDateTime");
    }

    @Test
//    @Transactional
    void redisCacheTest() {
        logoutAccessTokenRepository.save(LogoutAccessToken.builder()
                .accessToken("accessTokenTest")
                .memberId(100L)
                .expiration(10000L)
                .expire(LocalDateTime.now())
                .build());

        LogoutAccessToken logoutAccessToken = logoutAccessTokenRepository.findById("accessTokenTest").get();
        assertEquals(logoutAccessToken.getExpire().getClass().getName(), "java.time.LocalDateTime");
    }

}