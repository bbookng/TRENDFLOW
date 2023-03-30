package com.trendflow.analyze.msa.service;

import com.trendflow.analyze.msa.dto.request.GetSourceRequest;
import com.trendflow.analyze.msa.dto.vo.Source;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonService {
    private final CommonServiceClient commonServiceClient;

    public List<Source> getSource(String keyword, LocalDateTime startDate, LocalDateTime endDate){
        return commonServiceClient.getSource(GetSourceRequest.builder()
                        .keyword(keyword)
                        .startDate(startDate.toLocalDate().toString())
                        .endDate(endDate.toLocalDate().toString())
                        .build());
    }
}
