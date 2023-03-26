package com.trendflow.common.local.repository;

import com.trendflow.common.local.entity.LocalCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocalCodeRepository extends JpaRepository<LocalCode, String> {
    List<LocalCode> findByGroupCode(String groupCode);
    Optional<LocalCode> findByName(String name);
}
