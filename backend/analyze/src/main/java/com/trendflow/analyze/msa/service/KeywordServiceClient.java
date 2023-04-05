package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.vo.Keyword;
import com.trendflow.analyze.msa.dto.vo.KeywordCount;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@FeignClient("KEYWORD")
public interface KeywordServiceClient {
    @GetMapping("/keyword")
    List<Keyword> getKeyword(@RequestParam String keyword,
                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate);

    @GetMapping("/keyword/page")
    List<Keyword> getKeywordPage(@RequestParam String keyword,
                             @RequestParam String code,
                             @RequestParam Integer page,
                             @RequestParam Integer perPage,
                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                             @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate);

    @GetMapping("/keyword/platform")
    List<KeywordCount> getKeywordCount(@RequestParam String keyword,
                                       @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                       @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate);
}
