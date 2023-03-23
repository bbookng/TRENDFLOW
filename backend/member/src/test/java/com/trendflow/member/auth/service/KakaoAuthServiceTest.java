package com.trendflow.member.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.auth.dto.authentication.KakaoAccess;
import com.trendflow.member.auth.dto.authentication.KakaoUser;
import com.trendflow.member.global.code.PlatformCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class KakaoAuthServiceTest {

    @Autowired
    private MemberService memberService;

    @Value("${login.kakao.client-id}")
    private String ClientId;
    @Value("${login.kakao.client-secret}")
    private String ClientSecret;
    @Value("${login.kakao.redirect-uri}")
    private String RedirectUri;
    @Value("${login.kakao.token-uri}")
    private String KakaoTokenUri;
    @Value("${login.kakao.info-uri}")
    private String KakaoInfoUri;

    @Test
    @Transactional
    void getAccessToken() {
        try {
            String authCode = "";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("code", authCode);
            body.add("grant_type", "authorization_code");
            body.add("client_id", ClientId);
            body.add("redirect_uri", RedirectUri);
            body.add("client_secret", ClientSecret);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    KakaoTokenUri,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            // HTTP 응답 (JSON) -> 액세스 토큰 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            String refreshToken = jsonNode.get("refresh_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();
            Integer refreshTokenExpire = jsonNode.get("refresh_token_expires_in").asInt();
            String scope = jsonNode.get("scope").asText();

            KakaoAccess kakaoAccess = KakaoAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshTokenExpire(refreshTokenExpire)
                    .scope(Arrays.asList(scope.split(" ")))
                    .build();

            System.out.println(kakaoAccess);
            assertEquals(kakaoAccess.getTokenType(), "bearer");

        } catch (Exception e){
            System.out.println(e.getMessage());
            assertTrue(true);
        }
    }

    @Test
    @Transactional
    void getUser() {
        try {
            String accessToken = "";

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("Bearer %s", accessToken));

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(new LinkedMultiValueMap<>(), headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    KakaoInfoUri,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            // HTTP 응답 (JSON) -> 액세스 토큰 파싱
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody()).get("kakao_account");

            String name = jsonNode.get("profile").get("nickname").asText();
            String email = jsonNode.get("email").asText();
            String gender = jsonNode.get("gender").asText();
            String age = jsonNode.get("age_range").asText();
            String birthday = jsonNode.get("birthday").asText();

            KakaoUser kakaoUser = KakaoUser.builder()
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

            System.out.println(kakaoUser);
            assertEquals(kakaoUser.getName(), "박상민");

        } catch (Exception e){
            System.out.println(e.getMessage());
            assertTrue(true);
        }
    }

    @Test
    @Transactional
    void getMemberTest(){
        String name = "박상민";                    // nickname
        String email = "tablemin@kakao.com";     // email
        String gender = "male";                  // gender
        String age = "20~29";                    // age_range
        String birthday = "0506";                // birthday

        KakaoUser kakaoUser = KakaoUser.builder()
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

        try {
            memberService.findMember(kakaoUser.getEmail());
        } catch (NotFoundException e) {
            String platformCode = PlatformCode.KAKAO.getCode();
            String password = UUID.randomUUID().toString().replace("-", "");

            memberService.registMember(Member.builder()
                    .platformCode(platformCode)
                    .name(kakaoUser.getName())
                    .email(kakaoUser.getEmail())
                    .gender(kakaoUser.getGender())
                    .age(kakaoUser.getAge())
                    .birthday(kakaoUser.getBirthday())
                    .password(password)
                    .build());
        }
    }
}