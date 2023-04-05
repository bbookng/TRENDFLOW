package com.trendflow.common.local.service;

import com.trendflow.common.global.code.Code;
import com.trendflow.common.global.exception.NotFoundException;
import com.trendflow.common.local.dto.request.GetSourceRequest;
import com.trendflow.common.local.dto.response.FindLocalCodeResponse;
import com.trendflow.common.local.dto.response.FindRelateCodeResponse;
import com.trendflow.common.local.dto.response.GetSourceResponse;
import com.trendflow.common.local.entity.LocalCode;
import com.trendflow.common.local.entity.RelateCode;
import com.trendflow.common.local.entity.Source;
import com.trendflow.common.local.repository.LocalCodeRepository;
import com.trendflow.common.local.repository.RelateCodeRepository;
import com.trendflow.common.local.repository.SourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalCodeService {
    private final LocalCodeRepository localCodeRepository;
    private final RelateCodeRepository relateCodeRepository;
    private final SourceRepository sourceRepository;
    private final YoutubeService youtubeService;

    @Transactional
    public List<FindLocalCodeResponse> findAllLocalCode(String groupCode) {
        List<LocalCode> localCodeList = localCodeRepository.findByGroupCode(groupCode);
        return FindLocalCodeResponse.toList(localCodeList);
    }

    @Transactional
    public FindLocalCodeResponse findLocalCode(String name) throws RuntimeException{
        LocalCode localCode = localCodeRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException());
        return FindLocalCodeResponse.of(localCode);
    }

    @Transactional
    public List<FindRelateCodeResponse> findRelateCode(String code) {
        List<RelateCode> relateCodeList = relateCodeRepository.findByCode(code);
        return FindRelateCodeResponse.toList(relateCodeList);
    }

    public List<GetSourceResponse> getSource(List<Long> sourceIdList) throws RuntimeException {
        List<Source> sourceList = sourceRepository.findByPlatformCodeInAndSourceIdIn(sourceIdList);
        return GetSourceResponse.toList(sourceList);
    }
}
