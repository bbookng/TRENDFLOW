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

    public void save(String key, List<Social> youtubeCommentList) {
        ValueOperations<String, List<Social>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, youtubeCommentList);
    }

    public void saveResult(String key, List<Social> socialList, Integer expire) {
        ValueOperations<String, List<Social>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, socialList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<Social>> findById(String key) {
        ValueOperations<String, List<Social>> valueOperations = redisTemplate.opsForValue();
        List<Social> socialList = valueOperations.get(key);
        return Optional.ofNullable(socialList);
    }
}
