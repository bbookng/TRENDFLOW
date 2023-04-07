package com.trendflow.member.member.repository;

import com.trendflow.member.member.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByMemberId(Long memberId);
    void deleteByMemberId(Long memberId);
}
