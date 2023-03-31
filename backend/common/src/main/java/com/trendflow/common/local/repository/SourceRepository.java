package com.trendflow.common.local.repository;

import com.trendflow.common.local.entity.Source;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SourceRepository extends JpaRepository<Source, Long> {
    List<Source> findByPlatformCodeInAndSourceIdIn(List<String> platformCodeList, List<Long> sourceIdList);
}
