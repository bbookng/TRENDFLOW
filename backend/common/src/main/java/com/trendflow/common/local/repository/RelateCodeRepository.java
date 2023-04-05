package com.trendflow.common.local.repository;

import com.trendflow.common.local.entity.RelateCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelateCodeRepository extends JpaRepository<RelateCode, String> {
    List<RelateCode> findByCode(String code);
}
