package com.trendflow.keyword.keyword.controller;

import com.trendflow.keyword.global.code.KeywordCode;
import com.trendflow.keyword.global.exception.NotFoundException;
import com.trendflow.keyword.global.response.BasicResponse;
import com.trendflow.keyword.keyword.dto.response.FindHotKeywordResponse;
import com.trendflow.keyword.keyword.service.KeywordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }
}
