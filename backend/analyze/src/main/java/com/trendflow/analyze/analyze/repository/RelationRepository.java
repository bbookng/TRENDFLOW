package com.trendflow.analyze.analyze.repository;

import com.trendflow.analyze.analyze.entity.Relation;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {

    @Query(value = "SELECT r.relation_id, r.keyword_id, r.keyword, r.relation_keyword_id, r. relation_keyword, r.count, DATE(r.reg_dt) as reg_dt " +
            "FROM relation r " +
            "WHERE r.keyword_id IN (:keywordIdList) " +
            "ORDER BY r.count DESC " +
            "LIMIT :limit ;", nativeQuery = true)
    List<Relation> findByKeywordIdList(@Param("keywordIdList") List<Long> keywordIdList,
                                                         @Param("limit") Integer limit);
}
