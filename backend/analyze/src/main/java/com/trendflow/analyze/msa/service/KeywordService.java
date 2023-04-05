package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.vo.Keyword;
import com.trendflow.analyze.msa.dto.vo.KeywordCount;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {
    private final KeywordServiceClient keywordServiceClient;

    public List<Keyword> getKeyword(String keyword, LocalDate startDate, LocalDate endDate) {
        return keywordServiceClient.getKeyword(keyword, startDate, endDate);
    }

    public List<KeywordCount> getKeywordCount(String keyword, LocalDate startDate, LocalDate endDate) {
        return keywordServiceClient.getKeywordCount(keyword, startDate, endDate);
    }
}
