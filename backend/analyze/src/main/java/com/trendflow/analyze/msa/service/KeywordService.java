package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.vo.Keyword;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordServiceClient keywordServiceClient;

    public List<Keyword> getKeyword(String keyword, LocalDateTime startDate, LocalDateTime endDate) {
        return keywordServiceClient.getKeyword(keyword, startDate, endDate);
    }

    public List<Keyword> getKeywordCount(String platformCode, LocalDateTime startDate, LocalDateTime endDate) {
        return keywordServiceClient.getKeywordCount(platformCode, startDate, endDate);
    }
}
