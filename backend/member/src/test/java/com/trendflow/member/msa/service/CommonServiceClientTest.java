package com.trendflow.member.msa.service;

import com.trendflow.member.msa.dto.response.LocalCode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CommonServiceClientTest {

    @Autowired
    private CommonServiceClient commonServiceClient;

    @Test
    void localCodeTest() {
        LocalCode localCode = commonServiceClient.getLocalCode("NORMAL_USER");
        assertEquals(localCode.getCode(), "RL100");
    }
}