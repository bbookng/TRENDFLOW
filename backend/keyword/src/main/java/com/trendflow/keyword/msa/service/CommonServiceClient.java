package com.trendflow.keyword.msa.service;


import com.trendflow.keyword.msa.vo.RelateCode;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient("COMMON")
public interface CommonServiceClient {
    @GetMapping("/common/relate/{name}")
    List<RelateCode> getRelateCode(@PathVariable String name);

}
