package com.trendflow.member.msa.service;

import com.trendflow.member.msa.dto.response.LocalCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonService {
    private final CommonServiceClient commonServiceClient;

    public LocalCode getLocalCode(String name){
        return commonServiceClient.getLocalCode(name);
    }
}
