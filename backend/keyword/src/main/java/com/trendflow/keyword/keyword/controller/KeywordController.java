package com.trendflow.keyword.keyword.controller;

import com.trendflow.keyword.global.code.KeywordCode;
import com.trendflow.keyword.global.exception.NotFoundException;
import com.trendflow.keyword.global.response.BasicResponse;
import com.trendflow.keyword.keyword.dto.response.FindHotKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRecommendKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRelateKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindWordCloudResponse;
import com.trendflow.keyword.keyword.entity.Keyword;
import com.trendflow.keyword.keyword.entity.KeywordCount;
import com.trendflow.keyword.keyword.service.KeywordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/keyword")
public class KeywordController {
    private final KeywordService keywordService;

    @GetMapping("/hot")
    public ResponseEntity<FindHotKeywordResponse> findHotKeyword(){
        log.info("findHotKeyword - Call");

        try {
            FindHotKeywordResponse findHotKeywordResponse = keywordService.findHotKeyword();
            return ResponseEntity.ok().body(findHotKeywordResponse);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<FindRecommendKeywordResponse>> findRecommendKeyword(){
        log.info("findRecommendKeyword - Call");

        try {
            List<FindRecommendKeywordResponse> findRecommendKeywordResponseList = keywordService.findRecommendKeyword();
            return ResponseEntity.ok().body(findRecommendKeywordResponseList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/related")
    public ResponseEntity<List<FindRelateKeywordResponse>> findRelateKeyword(@RequestParam String keyword){
        log.info("findRelateKeyword - Call");

        try {
            List<FindRelateKeywordResponse> findRelateKeywordResponseList = keywordService.findRelateKeyword(keyword);
            return ResponseEntity.ok().body(findRelateKeywordResponseList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            e.printStackTrace();
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/wordcloud")
    public ResponseEntity<List<FindWordCloudResponse>> findWordCloudKeyword(@RequestParam String keyword){
        log.info("findWordCloudKeyword - Call");

        try {
            List<FindWordCloudResponse> findWordCloudResponseList = keywordService.findWordCloudKeyword(keyword);
            return ResponseEntity.ok().body(findWordCloudResponseList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }


    @GetMapping("")
    public ResponseEntity<List<Keyword>> findKeyword(@RequestParam String keyword,
                                                     @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                     @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
        log.info("findKeyword - Call");

        try {
            List<Keyword> keywordList = keywordService.findKeyword(keyword, startDate, endDate);
            return ResponseEntity.ok().body(keywordList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/page")
    public ResponseEntity<List<Keyword>> findKeywordPage(@RequestParam String keyword,
                                        @RequestParam String code,
                                        @RequestParam Integer page,
                                        @RequestParam Integer perPage,
                                        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
        log.info("findKeywordPage - Call");

        try {
            List<Keyword> keywordList = keywordService.findKeywordPage(keyword, code, page, perPage, startDate, endDate);
            return ResponseEntity.ok().body(keywordList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/platform")
    public ResponseEntity<List<KeywordCount>> findKeywordCount(@RequestParam String keyword,
                                                               @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                                               @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate){
        log.info("findKeywordCount - Call");

        try {
            List<KeywordCount> keywordCountList = keywordService.findKeywordCount(keyword, startDate, endDate);
            return ResponseEntity.ok().body(keywordCountList);
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
