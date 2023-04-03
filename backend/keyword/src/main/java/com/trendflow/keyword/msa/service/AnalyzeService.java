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

    public List<Relation> getRelation(List<Long> keywordIdList){
        return analyzeServiceClient.getRelation(keywordIdList);
    }

    public List<Relation> getRelationForWordCloud(List<Long> keywordIdList) {
        return analyzeServiceClient.getRelationForWordCloud(keywordIdList);
    }
}
