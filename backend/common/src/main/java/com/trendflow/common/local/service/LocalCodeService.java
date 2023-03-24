package com.trendflow.common.local.service;

import com.trendflow.common.local.dto.response.FindLocalCodeResponse;
import com.trendflow.common.local.entity.LocalCode;
import com.trendflow.common.local.repository.LocalCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalCodeService {

    private final LocalCodeRepository localCodeRepository;

    public List<FindLocalCodeResponse> findAllLocalCode(String groupCode) {
        List<LocalCode> localCodeList = localCodeRepository.findByGroupCode(groupCode);
        return FindLocalCodeResponse.toList(localCodeList);
    }
}
