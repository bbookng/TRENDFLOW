package com.trendflow.analyze.analyze.controller;

import com.trendflow.analyze.global.code.AnalyzeCode;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/analyze")
public class AnalyzeController {
    @GetMapping("/health_check")
    public ResponseEntity<BasicResponse> healthCheck(){
        log.info("healthCheck - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(AnalyzeCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AnalyzeCode.FAIL, null));
        }
    }
}
