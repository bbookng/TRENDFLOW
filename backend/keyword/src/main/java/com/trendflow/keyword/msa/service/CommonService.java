package com.trendflow.keyword.msa.service;

import com.trendflow.keyword.msa.vo.RelateCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {
    private final CommonServiceClient commonServiceClient;

    public List<RelateCode> getRelateCode(String name){
        return commonServiceClient.getRelateCode(name);
    }
}
