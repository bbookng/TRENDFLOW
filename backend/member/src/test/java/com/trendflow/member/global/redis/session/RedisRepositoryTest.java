package com.trendflow.member.global.redis.session;

import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Token;
import com.trendflow.member.member.repository.TokenRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RedisRepositoryTest {

    @Autowired
    private LoginRefreshTokenRepository loginRefreshTokenRepository;
    @Autowired
    private TokenRepository tokenRepository;

    @Test
    @Transactional
    void redisSessionTest() {
        try {
            loginRefreshTokenRepository.saveLogin(LoginRefreshToken.builder()
                    .accessToken("accessTokenTest")
                    .refreshToken("refreshTokenTest")
                    .memberId(100L)
                    .accessTokenExpire(60)
                    .refreshTokenExpire(120)
                    .build());

            LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById("refreshTokenTest")
                    .orElseThrow(() -> new NotFoundException());

            System.out.println("loginRefreshToken = " + loginRefreshToken);

            assertTrue(true);
        } catch (NotFoundException e){
            assertTrue(false);
        }
    }

    @Test
    void redisSessionSearchTest() {
        try {
            Token token = tokenRepository.findById(21L)
                    .orElseThrow(() -> new NotFoundException());
            LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById("5fpaFEvVruQ2LYikX2Z88IG3TyIil9_2ckBQlA_GCj1zTQAAAYcm0tLu")
                    .orElseThrow(() -> new NotFoundException());

            System.out.println("loginRefreshToken = " + loginRefreshToken);
        } catch (NotFoundException e){
            assertTrue(false);
        }
    }

    @Test
    @Transactional
    void redisCacheTest() {
    }
}