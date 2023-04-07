package com.trendflow.common.local.service;

import com.trendflow.common.local.entity.Source;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class YoutubeServiceTest {

    @Autowired
    private YoutubeService youtubeService;

    @Test
    void getYoutubeSourceTest() {
        List<Source> sourceList = youtubeService.getYoutubeSource("SSAFY");

        for (Source source : sourceList) {
            System.out.println(source);
        }

    }

}