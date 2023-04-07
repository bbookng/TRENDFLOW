package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.Relation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "ANALYZE")
public interface AnalyzeServiceClient {
    @PostMapping("/analyze/relate")
    List<Relation> getRelation(@RequestBody List<Long> keywordIdList);
    @PostMapping("/analyze/relate/wordcloud")
    List<Relation> getRelationForWordCloud(@RequestBody List<Long> keywordIdList);
}
