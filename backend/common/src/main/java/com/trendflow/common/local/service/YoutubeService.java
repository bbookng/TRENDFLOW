package com.trendflow.common.local.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.common.global.exception.NotFoundException;
import com.trendflow.common.global.exception.UnAuthException;
import com.trendflow.common.local.entity.Source;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class YoutubeService {
    @Value("${youtube.uri}")
    private String YOUTUBE_URI;
    @Value("${youtube.key}")
    private String YOUTUBE_KEY;

    public List<Source> getYoutubeSource(String keyword) {
        try {

            HttpHeaders headers = new HttpHeaders();
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

            UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(YOUTUBE_URI)
                    .queryParam("part", "snippet")
                    .queryParam("maxResults", 20)
                    .queryParam("q", keyword)
                    .queryParam("type", "video")
                    .queryParam("key", YOUTUBE_KEY)
                    .build(true);

            System.out.println("uriBuilder.toString() = " + uriBuilder.toString());

            HttpEntity<MultiValueMap<String, String>> youtubeRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    youtubeRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody()).get("items");

            Iterator<JsonNode> items = jsonNode.elements();

            List<Source> sourceList = new ArrayList<>();
            while(items.hasNext()){
                JsonNode item = items.next();
                JsonNode snippet = item.get("snippet");
                String title = snippet.get("title").asText();
                String link = "https://www.youtube.com/watch?v=" + item.get("id").get("videoId").asText();
                String content = snippet.get("description").asText();
                LocalDateTime regDt = ZonedDateTime.parse(snippet.get("publishedAt").asText()).toLocalDateTime();
                String thumbImg = snippet.get("thumbnails").get("medium").get("url").asText();

                sourceList.add(Source.builder()
                        .title(title)
                        .link(link)
                        .content(content)
                        .regDt(regDt)
                        .thumbImg(thumbImg)
                        .build());
            }

            return sourceList;

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new NotFoundException();
        }

    }

}
