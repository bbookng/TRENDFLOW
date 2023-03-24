package com.trendflow.common.local.service;

import com.trendflow.common.local.dto.response.FindLocalCodeResponse;
import com.trendflow.common.local.entity.LocalCode;
import com.trendflow.common.local.repository.LocalCodeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LocalCodeServiceTest {

    @Autowired
    private LocalCodeRepository localCodeRepository;

    @Test
    @Transactional
    void findAllLocalCodeTest() {
        List<LocalCode> localCodeList = localCodeRepository.findByGroupCode("PL");
        List<FindLocalCodeResponse> findLocalCodeResponseList = FindLocalCodeResponse.toList(localCodeList);
        assertTrue(findLocalCodeResponseList.size() == 3);;
    }
}