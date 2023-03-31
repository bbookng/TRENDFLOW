package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.Relation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "ANALYZE")
public interface AnalyzeServiceClient {
    @GetMapping("/analyze/relate")
    List<Relation> getRelation(@RequestParam List<Long> keywordIdList);
    @GetMapping("/analyze/relate/wordcloud")
    List<Relation> getRelationForWordCloud(@RequestParam List<Long> keywordIdList);
}
