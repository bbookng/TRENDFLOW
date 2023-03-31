package com.trendflow.keyword.keyword.Repository;

import com.trendflow.keyword.keyword.entity.Keyword;
import com.trendflow.keyword.keyword.entity.KeywordCount;
import com.trendflow.keyword.keyword.entity.KeywordDistinct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    @Query(value = "SELECT k.keyword, SUM(k.count) as count " +
            "FROM keyword k " +
            "WHERE k.reg_dt BETWEEN :startDate AND :endDate " +
            "GROUP BY k.keyword " +
            "ORDER BY count DESC LIMIT :limit", nativeQuery = true)
    List<KeywordDistinct> findByRegDt(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, @Param("limit") Integer limit);
    List<Keyword> findByKeyword(String keyword);
    List<Keyword> findByKeywordAndRegDtBetweenOrderBySourceId(String keyword, LocalDateTime atStartOfDay, LocalDateTime atStartOfDay1);

    @Query(value =
            "SELECT k.platform_code as platformCode, SUM(k.count) as count, DATE(k.reg_dt) as regDt " +
                    "FROM keyword k " +
                    "WHERE keyword = :keyword " +
                    "AND k.reg_dt BETWEEN :startDate AND :endDate " +
                    "GROUP BY k.platform_code, DATE(k.reg_dt) " +
                    "ORDER BY DATE(k.reg_dt) ASC, platformCode ASC;",
            nativeQuery = true)
    List<KeywordCount> countByPlatformCodeAndRegDtBetween(String keyword, LocalDateTime startDate, LocalDateTime endDate);
}
