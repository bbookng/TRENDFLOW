package com.trendflow.keyword.keyword.controller;

import com.trendflow.keyword.global.code.KeywordCode;
import com.trendflow.keyword.global.exception.NotFoundException;
import com.trendflow.keyword.global.response.BasicResponse;
import com.trendflow.keyword.keyword.dto.response.FindHotKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRecommendKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindRelateKeywordResponse;
import com.trendflow.keyword.keyword.dto.response.FindWordCloudResponse;
import com.trendflow.keyword.keyword.service.KeywordService;
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
@RequestMapping("/keyword")
public class KeywordController {
    private final KeywordService keywordService;

    @GetMapping("/hot")
    public ResponseEntity<BasicResponse> findHotKeyword(){
        log.info("findHotKeyword - Call");

        try {
            FindHotKeywordResponse findHotKeywordResponse = keywordService.findHotKeyword();
            return ResponseEntity.ok().body(BasicResponse.Body(KeywordCode.SUCCESS, findHotKeywordResponse));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }

    @GetMapping("/recommend")
    public ResponseEntity<BasicResponse> findRecommendKeyword(){
        log.info("findRecommendKeyword - Call");

        try {
            FindRecommendKeywordResponse findRecommendKeywordResponse = keywordService.findRecommendKeyword();
            return ResponseEntity.ok().body(BasicResponse.Body(KeywordCode.SUCCESS, findRecommendKeywordResponse));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }

    @GetMapping("/relate/{keyword}")
    public ResponseEntity<BasicResponse> findRelateKeyword(@PathVariable String keyword){
        log.info("findRelateKeyword - Call");

        try {
            List<FindRelateKeywordResponse> findRelateKeywordResponseList = keywordService.findRelateKeyword(keyword);
            return ResponseEntity.ok().body(BasicResponse.Body(KeywordCode.SUCCESS, findRelateKeywordResponseList));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            e.printStackTrace();
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }

    @GetMapping("/wordcloud/{keyword}")
    public ResponseEntity<BasicResponse> findWordCloudKeyword(@PathVariable String keyword){
        log.info("findWordCloudKeyword - Call");

        try {
            FindWordCloudResponse findWordCloudResponse = keywordService.findWordCloudKeyword(keyword);
            return ResponseEntity.ok().body(BasicResponse.Body(KeywordCode.SUCCESS, findWordCloudResponse));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }
}
