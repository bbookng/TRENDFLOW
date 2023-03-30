package com.trendflow.keyword.keyword.Repository;

import com.trendflow.keyword.keyword.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    List<Keyword> findTop8ByRegDtBetweenOrderByCountDesc(LocalDateTime start, LocalDateTime end);
    List<Keyword> findTop10ByRegDtBetweenOrderByCountDesc(LocalDateTime start, LocalDateTime end);
    Optional<Keyword> findByKeyword(String keyword);
    List<Keyword> findByKeywordAndRegDtBetweenOrderBySourceId(String keyword, LocalDateTime atStartOfDay, LocalDateTime atStartOfDay1);

    @Query(value =
            "SELECT s.score as score, SUM(k.) as count, DATE(k.reg_dt) as regDt " +
                    "FROM keyword k " +
                    "WHERE k.keyword " +
                    "AND k.reg_dt BETWEEN :startDate AND :endDate " +
                    "GROUP BY k.platform_code, DATE(k.reg_dt) " +
                    "ORDER BY DATE(s.reg_dt) ASC, score ASC;",
            nativeQuery = true)
    Optional<Integer> countByPlatformCodeAndRegDtBetween(String platformCode, LocalDateTime startDate, LocalDateTime endDate);
}
