package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.Relation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "ANALYZE")
public interface AnalyzeServiceClient {
    @PostMapping("/analyze/relate/{keywordId}")
    List<Relation> getRelation(@PathVariable Long keywordId);
    @PostMapping("/analyze/relate/wordcloud/{keywordId}")
    List<Relation> getRelationForWordCloud(@PathVariable Long keywordId);
}
