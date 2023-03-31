package com.trendflow.analyze.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class YoutubeCommentRepository {
    private RedisTemplate redisTemplate;

    public YoutubeCommentRepository(@Qualifier("redisYoutubeCommentTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, List<YoutubeComment> youtubeCommentList) {
        ValueOperations<String, List<YoutubeComment>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, youtubeCommentList);
    }

    public void saveResult(String key, List<YoutubeComment> youtubeCommentList, Integer expire) {
        ValueOperations<String, List<YoutubeComment>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, youtubeCommentList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<YoutubeComment>> findById(String key) {
        ValueOperations<String, List<YoutubeComment>> valueOperations = redisTemplate.opsForValue();
        List<YoutubeComment> youtubeCommentList = valueOperations.get(key);
        return Optional.ofNullable(youtubeCommentList);
    }
}
