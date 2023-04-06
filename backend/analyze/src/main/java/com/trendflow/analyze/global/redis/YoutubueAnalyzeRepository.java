package com.trendflow.analyze.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class YoutubueAnalyzeRepository {
    private RedisTemplate redisTemplate;

    public YoutubueAnalyzeRepository(@Qualifier("redisYoutubueAnalyzeTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, YoutubueAnalyze youtubueAnalyze, Integer expire) {
        ValueOperations<String, YoutubueAnalyze> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, youtubueAnalyze);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<YoutubueAnalyze> findById(String key) {
        ValueOperations<String, YoutubueAnalyze> valueOperations = redisTemplate.opsForValue();
        YoutubueAnalyze youtubueAnalyze = valueOperations.get(key);
        return Optional.ofNullable(youtubueAnalyze);
    }
}
