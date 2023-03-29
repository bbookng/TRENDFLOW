package com.trendflow.keyword.keyword.Repository;

import com.trendflow.keyword.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findTop8ByRegDtOrderByCountDesc(LocalDateTime now);
}
