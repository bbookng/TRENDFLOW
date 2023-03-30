package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.request.GetSourceRequest;
import com.trendflow.analyze.msa.dto.vo.Source;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient("COMMON")
public interface CommonServiceClient {
    @PostMapping("/common/source")
    List<Source> getSource(@RequestBody GetSourceRequest getSourceRequest);
}
