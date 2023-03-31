package com.trendflow.common.local.service;

import com.trendflow.common.global.code.PlatformCode;
import com.trendflow.common.global.exception.NotFoundException;
import com.trendflow.common.local.dto.response.FindLocalCodeResponse;
import com.trendflow.common.local.dto.response.GetSourceResponse;
import com.trendflow.common.local.entity.LocalCode;
import com.trendflow.common.local.entity.Source;
import com.trendflow.common.local.repository.LocalCodeRepository;
import com.trendflow.common.local.repository.SourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocalCodeService {
    private final LocalCodeRepository localCodeRepository;
    private final SourceRepository sourceRepository;
    private final YoutubeService youtubeService;

    public List<FindLocalCodeResponse> findAllLocalCode(String groupCode) {
        List<LocalCode> localCodeList = localCodeRepository.findByGroupCode(groupCode);
        return FindLocalCodeResponse.toList(localCodeList);
    }

    public FindLocalCodeResponse findLocalCode(String name) throws RuntimeException{
        LocalCode localCode = localCodeRepository.findByName(name)
                .orElseThrow(() -> new NotFoundException());
        return FindLocalCodeResponse.fromEntity(localCode);

    }

    public List<GetSourceResponse> getSource(String keyword, List<Long> sourceIdList, String sourceCode) throws RuntimeException {
        String ARTICLE = findLocalCode(PlatformCode.ARTICLE.getCode()).getCode();
        String BLOG = findLocalCode(PlatformCode.BLOG.getCode()).getCode();
        String YOUTUBE = findLocalCode(PlatformCode.YOUTUBE.getCode()).getCode();

        String DAUM_NEWS = findLocalCode(PlatformCode.DAUM_NEWS.getCode()).getCode();
        String NAVER_NEWS = findLocalCode(PlatformCode.NAVER_NEWS.getCode()).getCode();
        String NAVER_BLOG = findLocalCode(PlatformCode.NAVER_BLOG.getCode()).getCode();
        String TWITTER = findLocalCode(PlatformCode.TWITTER.getCode()).getCode();

        List<String> platformCodeList = new ArrayList<>();
        List<GetSourceResponse> getSourceResponseList = null;
        if (sourceCode.equals(ARTICLE)) {
            platformCodeList.add(DAUM_NEWS);
            platformCodeList.add(NAVER_NEWS);
            List<Source> sourceList = sourceRepository.findByPlatformCodeInAndSourceIdIn(platformCodeList, sourceIdList);
            getSourceResponseList = GetSourceResponse.toList(sourceList);
        } else if (sourceCode.equals(BLOG)) {
            platformCodeList.add(NAVER_BLOG);
            platformCodeList.add(TWITTER);
            List<Source> sourceList = sourceRepository.findByPlatformCodeInAndSourceIdIn(platformCodeList, sourceIdList);
            getSourceResponseList = GetSourceResponse.toList(sourceList);
        } else if (sourceCode.equals(YOUTUBE)) {
            List<Source> sourceList = youtubeService.getYoutubeSource(keyword);
            getSourceResponseList = GetSourceResponse.toList(sourceList);
        } else throw new NotFoundException();

        return getSourceResponseList;
    }
}
