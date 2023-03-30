package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.Relation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.PropertyValues;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyzeService {
    private final AnalyzeServiceClient analyzeServiceClient;

    public List<Relation> getRelation(Long keywordId){
        return analyzeServiceClient.getRelation(keywordId);
    }

    public List<Relation> getRelationForWordCloud(Long keywordId) {
        return analyzeServiceClient.getRelationForWordCloud(keywordId);
    }
}
