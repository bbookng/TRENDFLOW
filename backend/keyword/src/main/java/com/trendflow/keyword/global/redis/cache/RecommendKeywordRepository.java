package com.trendflow.keyword.global.redis.cache;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class RecommendKeywordRepository {
    private RedisTemplate redisTemplate;

    public RecommendKeywordRepository(@Qualifier("redisRecommendKeywordTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, List<RecommendKeyword> recommendKeywordList) {
        ValueOperations<String, List<RecommendKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, recommendKeywordList);
    }

    public void saveResult(String key, List<RecommendKeyword> recommendKeywordList, Integer expire) {
        ValueOperations<String, List<RecommendKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, recommendKeywordList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<RecommendKeyword>> findById(String key) {
        ValueOperations<String, List<RecommendKeyword>> valueOperations = redisTemplate.opsForValue();
        List<RecommendKeyword> recommendKeywordList = valueOperations.get(key);
        return Optional.ofNullable(recommendKeywordList);
    }
}