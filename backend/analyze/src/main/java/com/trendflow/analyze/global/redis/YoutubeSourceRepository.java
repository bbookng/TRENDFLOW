package com.trendflow.analyze.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class YoutubeSourceRepository {
    private RedisTemplate redisTemplate;

    public YoutubeSourceRepository(@Qualifier("redisYoutubeSourceTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void saveResult(String key, List<YoutubeSource> youtubeSourceList, Integer expire) {
        ValueOperations<String, List<YoutubeSource>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, youtubeSourceList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<YoutubeSource>> findById(String key) {
        ValueOperations<String, List<YoutubeSource>> valueOperations = redisTemplate.opsForValue();
        List<YoutubeSource> youtubeSourceList = valueOperations.get(key);
        return Optional.ofNullable(youtubeSourceList);
    }
}
