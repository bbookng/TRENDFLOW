package com.trendflow.analyze.analyze.controller;

import com.trendflow.analyze.analyze.dto.response.FindRelationKeywordResponse;
import com.trendflow.analyze.analyze.dto.response.FindWordCloudKeywordResponse;
import com.trendflow.analyze.analyze.entity.Relation;
import com.trendflow.analyze.analyze.service.AnalyzeService;
import com.trendflow.analyze.global.code.AnalyzeCode;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analyze")
public class AnalyzeController {
    private final AnalyzeService analyzeService;

    @GetMapping("/relate/{keywordId}")
    public ResponseEntity<List<FindRelationKeywordResponse>> findRelationKeyword(@PathVariable Long keywordId){
        log.info("findRelationKeyword - Call");

        try {
            List<FindRelationKeywordResponse> findLocalCodeResponseList = analyzeService.findRelationKeyword(keywordId);
            return ResponseEntity.ok().body(findLocalCodeResponseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/relate/wordcloud/{keywordId}")
    public ResponseEntity<List<FindWordCloudKeywordResponse>> findWordCloudKeyword(@PathVariable Long keywordId){
        log.info("findWordCloudKeyword - Call");

        try {
            List<FindWordCloudKeywordResponse> findWordCloudKeywordResponseList = analyzeService.findWordCloudKeyword(keywordId);
            return ResponseEntity.ok().body(findWordCloudKeywordResponseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }

    }
}
