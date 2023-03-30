package com.trendflow.keyword.global.redis.cache;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class HotKeywordRepository {
    private RedisTemplate redisTemplate;

    public HotKeywordRepository(@Qualifier("redisHotKeywordTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, List<HotKeyword> hotKeywordList) {
        ValueOperations<String, List<HotKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, hotKeywordList);
    }

    public void saveResult(String key, List<HotKeyword> hotKeywordList, Integer expire) {
        ValueOperations<String, List<HotKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, hotKeywordList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<HotKeyword>> findById(String key) {
        ValueOperations<String, List<HotKeyword>> valueOperations = redisTemplate.opsForValue();
        List<HotKeyword> hotKeywordList = valueOperations.get(key);
        return Optional.ofNullable(hotKeywordList);
    }
}
