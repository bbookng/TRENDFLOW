package com.trendflow.common.common.controller;

import com.trendflow.common.global.code.CommonCode;
import com.trendflow.common.global.exception.NotFoundException;
import com.trendflow.common.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/common")
public class CommonController {
    @GetMapping("/health_check")
    public ResponseEntity<BasicResponse> healthCheck(){
        log.info("healthCheck - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(CommonCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(CommonCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(CommonCode.FAIL, null));
        }
    }
}
