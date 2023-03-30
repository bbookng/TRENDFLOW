package com.trendflow.analyze.analyze.repository;

import com.trendflow.analyze.analyze.entity.Sentiment;
import com.trendflow.analyze.analyze.entity.SentimentCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SentimentRepository extends JpaRepository<Sentiment, Long> {
    @Query(value =
            "SELECT s.score as score, COUNT(s.score) as count, DATE(s.reg_dt) as regDt " +
            "FROM sentiment s " +
            "WHERE s.source_id IN ( :sourceIdList ) " +
            "AND s.reg_dt BETWEEN :startDate AND :endDate " +
            "GROUP BY score, DATE(s.reg_dt) " +
            "ORDER BY DATE(s.reg_dt) ASC, score ASC;",
            nativeQuery = true)
    List<SentimentCount> findBySourceIdIn(@Param("sourceIdList") List<Long> sourceIdList,
                                          @Param("startDate") LocalDateTime startDate,
                                          @Param("endDate") LocalDateTime endDate);
}
