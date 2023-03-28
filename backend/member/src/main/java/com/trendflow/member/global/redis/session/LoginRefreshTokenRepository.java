package com.trendflow.member.global.redis.session;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class LoginRefreshTokenRepository {
    private RedisTemplate redisTemplate;

    // 리프레시 토큰이 키
    
    public LoginRefreshTokenRepository(@Qualifier("redisSessionLoginRefreshTokenTemplate") RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveLogin(LoginRefreshToken loginRefreshToken) {
        ValueOperations<String, LoginRefreshToken> valueOperations = redisTemplate.opsForValue();

        String key = loginRefreshToken.getRefreshToken();
        valueOperations.set(key, loginRefreshToken);
        
        // 리프레시 토큰을 이용해 만료시간 설정
        Integer refreshTokenExpire = loginRefreshToken.getRefreshTokenExpire();
        redisTemplate.expire(key, refreshTokenExpire, TimeUnit.SECONDS);
    }

    public void saveRefresh(LoginRefreshToken loginRefreshToken) {
        ValueOperations<String, LoginRefreshToken> valueOperations = redisTemplate.opsForValue();

        String key = loginRefreshToken.getRefreshToken();
        valueOperations.set(key, loginRefreshToken);

        // 기존의 만료 시간을 유지
        Long refreshTokenExpire = Duration.between(LocalDateTime.now(), loginRefreshToken.getRefreshExpire()).getSeconds();
        redisTemplate.expire(key, refreshTokenExpire, TimeUnit.SECONDS);
    }

    public Optional<LoginRefreshToken> findById(String refreshToken) {
        ValueOperations<String, LoginRefreshToken> valueOperations = redisTemplate.opsForValue();
        LoginRefreshToken loginRefreshToken = valueOperations.get(refreshToken);

        if (Objects.isNull(loginRefreshToken)) return Optional.empty();

        return Optional.of(loginRefreshToken);
    }

    public void deleteById(String refreshToken) { redisTemplate.delete(refreshToken); }
}
