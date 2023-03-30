package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.Relation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "ANALYZE")
public interface AnalyzeServiceClient {
    @GetMapping("/analyze/relate/{keywordId}")
    List<Relation> getRelation(@PathVariable Long keywordId);
    @GetMapping("/analyze/relate/wordcloud/{keywordId}")
    List<Relation> getRelationForWordCloud(@PathVariable Long keywordId);
}
