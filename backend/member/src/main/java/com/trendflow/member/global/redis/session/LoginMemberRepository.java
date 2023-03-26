package com.trendflow.member.global.redis.session;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
public class LoginMemberRepository {

    private RedisTemplate redisTemplate;

    public LoginMemberRepository(@Qualifier("redisSessionLoginMemberTemplate") RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(LoginMember loginMember, Integer expire) {
        ValueOperations<String, LoginMember> valueOperations = redisTemplate.opsForValue();

        String key = loginMember.getRefreshToken();
        valueOperations.set(key, loginMember);

        redisTemplate.expire(key, expire, TimeUnit.SECONDS);
    }

    public Optional<LoginMember> findById(String refreshToken) {
        ValueOperations<String, LoginMember> valueOperations = redisTemplate.opsForValue();
        LoginMember loginMember = valueOperations.get(refreshToken);

        if (Objects.isNull(loginMember)) return Optional.empty();

        return Optional.of(loginMember);
    }

    public void deleteById(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }
}
