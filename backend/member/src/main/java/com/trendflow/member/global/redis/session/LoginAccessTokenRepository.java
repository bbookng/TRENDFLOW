package com.trendflow.member.global.redis.session;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class LoginAccessTokenRepository {
    private RedisTemplate redisTemplate;

    public LoginAccessTokenRepository(
            @Qualifier("redisSessionTemplate") RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(LoginAccessToken loginAccessToken) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();

        String key = loginAccessToken.getAccessToken();
        Long expiration = loginAccessToken.getExpiration();

        loginAccessToken.setExpire(LocalDateTime.now().plusSeconds(expiration));
        valueOperations.set(key, loginAccessToken);

        redisTemplate.expire(key, expiration, TimeUnit.SECONDS);
    }

    public Optional<LoginAccessToken> findById(String accessToken) {
        ValueOperations<String, LoginAccessToken> valueOperations = redisTemplate.opsForValue();
        LoginAccessToken loginAccessToken = valueOperations.get(accessToken);

        if (Objects.isNull(loginAccessToken)) return Optional.empty();

        return Optional.of(loginAccessToken);
    }
}
