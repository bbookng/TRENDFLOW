package com.trendflow.keyword.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class RelateKeywordRepository {
    private RedisTemplate redisTemplate;

    public RelateKeywordRepository(@Qualifier("redisRelateKeywordTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, List<RelateKeyword> relateKeywordList) {
        ValueOperations<String, List<RelateKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, relateKeywordList);
    }

    public void saveResult(String key, List<RelateKeyword> relateKeywordList, Integer expire) {
        ValueOperations<String, List<RelateKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, relateKeywordList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<RelateKeyword>> findById(String key) {
        ValueOperations<String, List<RelateKeyword>> valueOperations = redisTemplate.opsForValue();
        List<RelateKeyword> relateKeywordList = valueOperations.get(key);
        return Optional.ofNullable(relateKeywordList);
    }
}
