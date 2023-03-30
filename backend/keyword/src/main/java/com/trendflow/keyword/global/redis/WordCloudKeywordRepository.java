package com.trendflow.keyword.global.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class WordCloudKeywordRepository {
    private RedisTemplate redisTemplate;

    public WordCloudKeywordRepository(@Qualifier("redisWordCloudKeywordTemplate") RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    public void save(String key, List<WordCloudKeyword> wordCloudKeywordList) {
        ValueOperations<String, List<WordCloudKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, wordCloudKeywordList);
    }

    public void saveResult(String key, List<WordCloudKeyword> wordCloudKeywordList, Integer expire) {
        ValueOperations<String, List<WordCloudKeyword>> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(key, wordCloudKeywordList);
        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<List<WordCloudKeyword>> findById(String key) {
        ValueOperations<String, List<WordCloudKeyword>> valueOperations = redisTemplate.opsForValue();
        List<WordCloudKeyword> wordCloudKeywordList = valueOperations.get(key);
        return Optional.ofNullable(wordCloudKeywordList);
    }
}