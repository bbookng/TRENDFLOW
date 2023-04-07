package com.trendflow.common.local.repository;

import com.trendflow.common.local.entity.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {

    @Query(value = "SELECT s.source_id, s.brand_id, s.platform_code, s.title, s.link, s.content, DATE(s.reg_dt) as reg_dt, thumb_img " +
            "FROM source s " +
            "WHERE s.source_id IN (:sourceIdList);", nativeQuery = true)
    List<Source> findByPlatformCodeInAndSourceIdIn(@Param("sourceIdList") List<Long> sourceIdList);
}
