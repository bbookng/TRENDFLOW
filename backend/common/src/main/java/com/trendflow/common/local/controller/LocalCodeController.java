package com.trendflow.common.local.controller;

import com.trendflow.common.global.exception.NotFoundException;
import com.trendflow.common.local.dto.response.FindLocalCodeResponse;
import com.trendflow.common.local.service.LocalCodeService;
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
@RequestMapping("/common")
public class LocalCodeController {
    private final LocalCodeService localCodeService;

    @GetMapping("/group/{groupCode}")
    public ResponseEntity<List<FindLocalCodeResponse>> findAllLocalCode(@PathVariable(name = "groupCode") String groupCode){
        log.info("findAllLocalCode - Call");

        try {
            List<FindLocalCodeResponse> findLocalCodeResponseList = localCodeService.findAllLocalCode(groupCode);
            return ResponseEntity.ok().body(findLocalCodeResponseList);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/local/{name}")
    public ResponseEntity<FindLocalCodeResponse> findLocalCode(@PathVariable(name = "name") String name){
        log.info("findLocalCode - Call");

        try {
            FindLocalCodeResponse findLocalCodeResponse = localCodeService.findLocalCode(name);
            return ResponseEntity.ok().body(findLocalCodeResponse);
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
