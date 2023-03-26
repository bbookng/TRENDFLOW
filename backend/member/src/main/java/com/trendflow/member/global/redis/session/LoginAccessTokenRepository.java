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
public class LoginAccessTokenRepository {
    private RedisTemplate redisTemplate;

    public LoginAccessTokenRepository(@Qualifier("redisSessionLoginAccessTokenTemplate") RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveLogin(LoginAccessToken loginAccessToken) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();

        String key = loginAccessToken.getAccessToken();
        valueOperations.set(key, loginAccessToken);
        
        // 리프레시 토큰을 이용해 만료시간 설정
        Integer refreshTokenExpire = loginAccessToken.getRefreshTokenExpire();
        redisTemplate.expire(key, refreshTokenExpire, TimeUnit.SECONDS);
    }

    public void saveRefresh(LoginAccessToken loginAccessToken) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();

        String key = loginAccessToken.getAccessToken();
        valueOperations.set(key, loginAccessToken);

        // 기존의 만료 시간을 유지
        Long refreshTokenExpire = Duration.between(LocalDateTime.now(), loginAccessToken.getRefreshExpire()).getSeconds();
        redisTemplate.expire(key, refreshTokenExpire, TimeUnit.SECONDS);
    }

    public void saveDisable(String accessToken, LocalDateTime accessTokenExpire) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();

        valueOperations.set(accessToken, LoginAccessToken.builder()
                                            .accessToken(accessToken)
                                            .isValid(false)
                                            .build());
        Long expire  = Duration.between(LocalDateTime.now(), accessTokenExpire).getSeconds();
        redisTemplate.expire(accessToken, expire, TimeUnit.SECONDS);
    }

    public Optional<LoginAccessToken> findById(String accessToken) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();
        LoginAccessToken loginAccessToken = valueOperations.get(accessToken);

        if (Objects.isNull(loginAccessToken)) return Optional.empty();

        return Optional.of(loginAccessToken);
    }
}
