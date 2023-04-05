package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.request.GetSourceRequest;
import com.trendflow.analyze.msa.dto.vo.LocalCode;
import com.trendflow.analyze.msa.dto.vo.Source;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@FeignClient("COMMON")
public interface CommonServiceClient {
    @GetMapping("/common/local/{name}")
    LocalCode getLocalCode(@PathVariable String name);
    @PostMapping("/common/source")
    List<Source> getSource(@RequestBody List<Long> sourceIdList);
}
