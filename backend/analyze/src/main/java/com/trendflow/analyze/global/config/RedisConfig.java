package com.trendflow.analyze.global.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trendflow.analyze.global.redis.YoutubeComment;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {
    @Value("${spring.redis.cache.host}")
    private String cacheHost;
    @Value("${spring.redis.cache.port}")
    private Integer cachePort;
    @Value("${spring.redis.cache.password}")
    private String cachePassword;

    @Bean
    public Jackson2JsonRedisSerializer hotKeywordObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .findAndRegisterModules()
                .enable(SerializationFeature.INDENT_OUTPUT)
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerModules(new JavaTimeModule());

        TypeFactory typeFactory = objectMapper.getTypeFactory();
        CollectionType collectionType = typeFactory.constructCollectionType(List.class, YoutubeComment.class);

        Jackson2JsonRedisSerializer serializer = new Jackson2JsonRedisSerializer(collectionType);
        serializer.setObjectMapper(objectMapper);
        return serializer;
    }

    @Bean
    public RedisTemplate<?, ?> redisHotKeywordTemplate(
            @Qualifier("redisCacheConnectionFactory") RedisConnectionFactory redisConnectionFactory,
            @Qualifier("hotKeywordObjectMapper") Jackson2JsonRedisSerializer serializer) {
        return getRedisTemplate(redisConnectionFactory, serializer);
    }

    @Bean
    public RedisConnectionFactory redisCacheConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(cacheHost);
        redisStandaloneConfiguration.setPort(cachePort);
        redisStandaloneConfiguration.setPassword(cachePassword);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    private static RedisTemplate<?, ?> getRedisTemplate(RedisConnectionFactory redisConnectionFactory, Jackson2JsonRedisSerializer serializer) {
        RedisTemplate<byte[], byte[]> redisSessionTemplate = new RedisTemplate<>();
        redisSessionTemplate.setKeySerializer(new StringRedisSerializer());
        redisSessionTemplate.setValueSerializer(serializer);
        redisSessionTemplate.setHashKeySerializer(new StringRedisSerializer());
        redisSessionTemplate.setHashValueSerializer(serializer);
        redisSessionTemplate.setConnectionFactory(redisConnectionFactory);
        return redisSessionTemplate;
    }
}
