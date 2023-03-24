package com.trendflow.keyword.keyword.controller;

import com.trendflow.keyword.global.code.KeywordCode;
import com.trendflow.keyword.global.exception.NotFoundException;
import com.trendflow.keyword.global.response.BasicResponse;
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
    @GetMapping("/health_check")
    public ResponseEntity<BasicResponse> healthCheck(){
        log.info("healthCheck - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(KeywordCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(KeywordCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(KeywordCode.FAIL, null));
        }
    }
}
