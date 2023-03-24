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
public class LogoutAccessTokenRepository {
    private RedisTemplate redisTemplate;

    public LogoutAccessTokenRepository(
            @Qualifier("redisCacheTemplate") RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(LogoutAccessToken logoutAccessToken) {
        ValueOperations<String, LogoutAccessToken> valueOperations = redisTemplate.opsForValue();

        String key = logoutAccessToken.getAccessToken();
        Long expiration = logoutAccessToken.getExpiration();

        logoutAccessToken.setExpire(LocalDateTime.now().plusSeconds(expiration));
        valueOperations.set(key, logoutAccessToken);

        redisTemplate.expire(key, expiration, TimeUnit.SECONDS);
    }

    public Optional<LogoutAccessToken> findById(String accessToken) {
        ValueOperations<String, LogoutAccessToken> valueOperations = redisTemplate.opsForValue();
        LogoutAccessToken logoutAccessToken = valueOperations.get(accessToken);

        if (Objects.isNull(logoutAccessToken)) return Optional.empty();

        return Optional.of(logoutAccessToken);
    }
}
