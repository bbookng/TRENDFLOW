package com.trendflow.member.global.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.trendflow.member.global.redis.session.LoginRefreshToken;
import com.trendflow.member.global.redis.session.LoginAccessToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {
    @Value("${spring.redis.session.host}")
    private String sessionHost;
    @Value("${spring.redis.session.port}")
    private Integer sessionPort;
    @Value("${spring.redis.session.password}")
    private String sessionPassword;

    @Value("${spring.redis.cache.host}")
    private String cacheHost;
    @Value("${spring.redis.cache.port}")
    private Integer cachePort;
    @Value("${spring.redis.cache.password}")
    private String cachePassword;

    @Bean
    public Jackson2JsonRedisSerializer loginAccessTokenObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .findAndRegisterModules()
                .enable(SerializationFeature.INDENT_OUTPUT)
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerModules(new JavaTimeModule());
        Jackson2JsonRedisSerializer serializer = new Jackson2JsonRedisSerializer<>(LoginRefreshToken.class);
        serializer.setObjectMapper(objectMapper);
        return serializer;
    }

    @Bean
    public Jackson2JsonRedisSerializer loginMemberObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .findAndRegisterModules()
                .enable(SerializationFeature.INDENT_OUTPUT)
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .registerModules(new JavaTimeModule());
        Jackson2JsonRedisSerializer serializer = new Jackson2JsonRedisSerializer<>(LoginAccessToken.class);
        serializer.setObjectMapper(objectMapper);
        return serializer;
    }

    @Bean
    public RedisConnectionFactory redisSessionConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(sessionHost);
        redisStandaloneConfiguration.setPort(sessionPort);
        redisStandaloneConfiguration.setPassword(sessionPassword);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }

    @Primary
    @Bean
    public RedisConnectionFactory redisCacheConnectionFactory() {
        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory();
        lettuceConnectionFactory.setHostName(cacheHost);
        lettuceConnectionFactory.setPort(cachePort);
        lettuceConnectionFactory.setPassword(cachePassword);
        return lettuceConnectionFactory;
    }

    @Bean
    public RedisTemplate<?, ?> redisSessionLoginAccessTokenTemplate(
            @Qualifier("redisSessionConnectionFactory") RedisConnectionFactory redisConnectionFactory,
            @Qualifier("loginAccessTokenObjectMapper") Jackson2JsonRedisSerializer serializer) {
        return getRedisTemplate(redisConnectionFactory, serializer);
    }

    @Bean
    public RedisTemplate<?, ?> redisSessionLoginMemberTemplate(
            @Qualifier("redisSessionConnectionFactory") RedisConnectionFactory redisConnectionFactory,
            @Qualifier("loginMemberObjectMapper") Jackson2JsonRedisSerializer serializer) {
        return getRedisTemplate(redisConnectionFactory, serializer);
    }

    @Bean
    public RedisTemplate<?, ?> redisCacheTemplate(
            @Qualifier("redisCacheConnectionFactory") RedisConnectionFactory redisConnectionFactory,
            @Qualifier("loginMemberObjectMapper") Jackson2JsonRedisSerializer serializer) {
        return getRedisTemplate(redisConnectionFactory, serializer);
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