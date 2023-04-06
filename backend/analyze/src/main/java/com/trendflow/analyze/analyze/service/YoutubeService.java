package com.trendflow.analyze.analyze.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.analyze.analyze.dto.vo.Payload.Comment;
import com.trendflow.analyze.global.exception.NotFoundException;
import com.trendflow.analyze.global.redis.YoutubueAnalyze;
import com.trendflow.analyze.msa.dto.vo.Source;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class YoutubeService {
    @Value("${youtube.search.uri}")
    private String YOUTUBE_URI;
    @Value("${youtube.key}")
    private String YOUTUBE_KEY;
    @Value("${youtube.video.uri}")
    private String YOUTUBE_VIDEO_URI;
    @Value("${youtube.channels.uri}")
    private String YOUTUBE_CHANNELS_URI;
    @Value("${youtube.comments.uri}")
    private String YOUTUBE_COMMENTS_URI;
    private final String EMBED_VIDEO = "https://www.youtube.com/embed/";

    public List<Source> getYoutubeSource(String keyword) {
        try {

            HttpHeaders headers = new HttpHeaders();
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

            UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(YOUTUBE_URI)
                    .queryParam("part", "snippet")
                    .queryParam("maxResults", 50)
                    .queryParam("q", keyword)
                    .queryParam("type", "video")
                    .queryParam("key", YOUTUBE_KEY)
                    .build(false);

            System.out.println(uriBuilder.toString());

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
                LocalDate date = ZonedDateTime.parse(snippet.get("publishedAt").asText()).toLocalDate();
                String thumbnail = snippet.get("thumbnails").get("medium").get("url").asText();

                sourceList.add(Source.builder()
                        .title(title)
                        .link(link)
                        .desc(content)
                        .date(date)
                        .thumbnail(thumbnail)
                        .build());
            }

            return sourceList;

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new NotFoundException();
        }

    }

    public YoutubueAnalyze getYoutubeVideo(String link) {
        try {
            HttpHeaders headers = new HttpHeaders();
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(YOUTUBE_VIDEO_URI)
                    .queryParam("part", "snippet,statistics")
                    .queryParam("id", link.split("=")[1])
                    .queryParam("key", YOUTUBE_KEY)
                    .build(false);
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
            JsonNode item = jsonNode.elements().next();
            JsonNode snippet = item.get("snippet");
            JsonNode statistics = item.get("statistics");
            String channelId = snippet.get("channelId").asText();
            String title = snippet.get("title").asText();
            String url = String.format("%s%s", EMBED_VIDEO, item.get("id").asText());
            Integer viewCount = statistics.get("viewCount").asInt();
            Integer likeCOunt = statistics.get("likeCount").asInt();
            Integer commentCount = statistics.get("commentCount").asInt();
            String name = snippet.get("channelTitle").asText();

            // 채널
            headers = new HttpHeaders();
            body = new LinkedMultiValueMap<>();
            uriBuilder = UriComponentsBuilder.fromHttpUrl(YOUTUBE_CHANNELS_URI)
                    .queryParam("part", "statistics")
                    .queryParam("id", channelId)
                    .queryParam("key", YOUTUBE_KEY)
                    .build(false);
            youtubeRequest = new HttpEntity<>(body, headers);
            rt = new RestTemplate();
            response = rt.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    youtubeRequest,
                    String.class
            );
            objectMapper = new ObjectMapper();
            jsonNode = objectMapper.readTree(response.getBody()).get("items");
            item = jsonNode.elements().next();
            statistics = item.get("statistics");
            Integer subscribeCount = statistics.get("subscriberCount").asInt();

            // 댓글
            headers = new HttpHeaders();
            body = new LinkedMultiValueMap<>();
            uriBuilder = UriComponentsBuilder.fromHttpUrl(YOUTUBE_COMMENTS_URI)
                    .queryParam("part", "snippet")
                    .queryParam("videoId", link.split("=")[1])
                    .queryParam("key", YOUTUBE_KEY)
                        .build(false);
            youtubeRequest = new HttpEntity<>(body, headers);
            rt = new RestTemplate();
            response = rt.exchange(
                    uriBuilder.toString(),
                    HttpMethod.GET,
                    youtubeRequest,
                    String.class
            );
            objectMapper = new ObjectMapper();
            jsonNode = objectMapper.readTree(response.getBody()).get("items");

            Iterator<JsonNode> items = jsonNode.elements();
            List<Comment> commentList = new ArrayList<>();

            while(items.hasNext()) {
                item = items.next();
                JsonNode topLevelComment = item.get("snippet").get("topLevelComment");
                String id = topLevelComment.get("id").asText();
                String comments = topLevelComment.get("snippet").get("textDisplay").asText();
                Integer likes = topLevelComment.get("snippet").get("likeCount").asInt();
                Integer dislikes = 0;
                Double sentiment = 0D;
                Integer label = 0;

                commentList.add(new Comment(id, comments, likes, dislikes, sentiment, label));
            }

            Double positive = 0D;
            Double negative = 0D;
            Double neutral = 0D;

            try {
                for (Comment comment : commentList) {
                    headers = new HttpHeaders();
                    body = new LinkedMultiValueMap<>();
                    uriBuilder = UriComponentsBuilder.fromHttpUrl("http://trendflow.site:9999/analyze")
                            .queryParam("new_sentence", comment.getComments())
                            .build(false);
                    youtubeRequest = new HttpEntity<>(body, headers);
                    rt = new RestTemplate();
                    response = rt.exchange(
                            uriBuilder.toString(),
                            HttpMethod.GET,
                            youtubeRequest,
                            String.class
                    );
                    objectMapper = new ObjectMapper();
                    jsonNode = objectMapper.readTree(response.getBody());
                    Integer score = jsonNode.get("result").asInt();
                    comment.setSentiment(score.doubleValue());

                    if (score == 0) negative++;
                    else if (score == 1) positive++;
                    else neutral++;
                }

                Double sum = positive + negative + neutral;
                if (sum != 0) {
                    positive = positive / sum * 100;
                    negative = negative / sum * 100;
                    neutral = neutral / sum * 100;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return YoutubueAnalyze.builder()
                    .title(title)
                    .url(url)
                    .viewCount(viewCount)
                    .likeCOunt(likeCOunt)
                    .commentCount(commentCount)
                    .name(name)
                    .subscribeCount(subscribeCount)
                    .commentList(commentList)
                    .positive(positive)
                    .negative(negative)
                    .neutral(neutral)
                    .build();
        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new NotFoundException();
        }
    }
}
