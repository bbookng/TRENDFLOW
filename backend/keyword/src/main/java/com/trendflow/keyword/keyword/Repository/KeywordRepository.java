package com.trendflow.keyword.keyword.Repository;

import com.trendflow.keyword.keyword.entity.Keyword;
import com.trendflow.keyword.keyword.entity.KeywordCount;
import com.trendflow.keyword.keyword.entity.KeywordDistinct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    @Query(value = "SELECT kc.keyword as keyword, SUM(kc.count) as count " +
            "FROM keyword_count kc " +
            "WHERE kc.reg_dt >= :startDate " +
            "AND kc.reg_dt <= :endDate " +
            "GROUP BY kc.keyword " +
            "ORDER BY count DESC LIMIT :limit ;", nativeQuery = true)
    List<KeywordDistinct> findByRegDt(@Param("startDate") Integer startDate,
                                      @Param("endDate") Integer endDate,
                                      @Param("limit") Integer limit);

    @Query(value =
            "SELECT k.platform_code as platformCode, SUM(k.count) as count, DATE(k.reg_dt) as regDt " +
                    "FROM keyword k " +
                    "WHERE keyword = :keyword " +
                    "AND k.reg_dt >= :startDate " +
                    "AND k.reg_dt <= :endDate " +
                    "GROUP BY k.platform_code, k.reg_dt " +
                    "ORDER BY k.reg_dt, platformCode;",
            nativeQuery = true)
    List<KeywordCount> countByPlatformCodeAndRegDt(@Param("keyword") String keyword,
                                                   @Param("startDate") Integer startDate,
                                                   @Param("endDate") Integer endDate);

    @Query(value = "SELECT k.keyword_id, k.source_id, k.platform_code, k.keyword, k.count, DATE(k.reg_dt) as reg_dt " +
            "FROM keyword k " +
            "WHERE k.keyword = :keyword ;", nativeQuery = true)
    List<Keyword> findAllByKeyword(@Param("keyword") String keyword);

    @Query(value = "SELECT k.keyword_id, k.source_id, k.platform_code, k.keyword, k.count, DATE(k.reg_dt) as reg_dt " +
            "FROM keyword k " +
            "WHERE k.keyword = :keyword " +
            "AND k.reg_dt >= :startDate " +
            "AND k.reg_dt <= :endDate ;", nativeQuery = true)
    List<Keyword> findByKeywordAndDate(@Param("keyword") String keyword,
                                       @Param("startDate") Integer startDate,
                                       @Param("endDate") Integer endDate);

    @Query(value = "SELECT k.keyword_id, k.source_id, k.platform_code, k.keyword, k.count, DATE(k.reg_dt) as reg_dt " +
            "FROM keyword k " +
            "WHERE k.keyword = :keyword " +
            "AND k.platform_code IN (:codeList) " +
            "AND k.reg_dt >= :startDate " +
            "AND k.reg_dt <= :endDate " +
            "LIMIT :limit " +
            "OFFSET :offset ;", nativeQuery = true)
    List<Keyword> findByKeywordAndDatePage(@Param("keyword") String keyword,
                                           @Param("codeList") List<String> codeList,
                                           @Param("offset") Integer offset,
                                           @Param("limit") Integer limit,
                                           @Param("startDate") Integer startDate,
                                           @Param("endDate") Integer endDate);

}
