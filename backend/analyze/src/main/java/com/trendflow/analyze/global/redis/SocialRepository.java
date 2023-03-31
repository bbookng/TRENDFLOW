package com.trendflow.analyze.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

public class SocialRepository {
    private RedisTemplate redisTemplate;

    public SocialRepository(@Qualifier("redisSocialTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, Social social) {
        ValueOperations<String, Social> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, social);
    }

    public void saveResult(String key, Social social, Integer expire) {
        ValueOperations<String, Social> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, social);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<Social> findById(String key) {
        ValueOperations<String, Social> valueOperations = redisTemplate.opsForValue();
        Social social = valueOperations.get(key);
        return Optional.ofNullable(social);
    }
}
