package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.global.code.Code;
import com.trendflow.analyze.msa.dto.vo.LocalCode;
import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {
    private final CommonServiceClient commonServiceClient;

    public String getLocalCode(Code code){
        String codeName = code.getName();
        LocalCode localCode = commonServiceClient.getLocalCode(codeName);
        return localCode.getCode();
}
    public List<Source> getSource(List<Long> sourceIdList){
        return commonServiceClient.getSource(sourceIdList);
    }
}
