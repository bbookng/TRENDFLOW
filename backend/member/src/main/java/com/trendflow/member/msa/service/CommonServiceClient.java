package com.trendflow.member.msa.service;

import com.trendflow.member.msa.dto.response.LocalCode;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COMMON")
public interface CommonServiceClient {
    @GetMapping("/common/local/{name}")
    LocalCode getLocalCode(@PathVariable String name);
}
