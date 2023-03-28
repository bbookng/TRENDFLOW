package com.trendflow.member.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.auth.dto.authentication.SocialAccess;
import com.trendflow.member.auth.dto.authentication.SocialTokenInfo;
import com.trendflow.member.auth.dto.authentication.SocialUser;
import com.trendflow.member.global.code.CommonCode;
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
    @Value("${login.kakao.admin-key}")
    private String adminKey;
    @Value("${login.kakao.client-id}")
    private String ClientId;
    @Value("${login.kakao.client-secret}")
    private String ClientSecret;
    @Value("${login.kakao.redirect-uri}")
    private String RedirectUri;
    @Value("${login.kakao.token-issuance-uri}")
    private String KakaoTokenIssuanceUri;
    @Value("${login.kakao.token-reissue-uri}")
    private String kakaoReissueUri;
    @Value("${login.kakao.token-expire-uri}")
    private String kakaoExpireUri;
    @Value("${login.kakao.token-auth-uri}")
    private String kakaoAuthUri;
    @Value("${login.kakao.info-uri}")
    private String KakaoInfoUri;

    @Test
    void getAccessTokenTest() {
        try {
            String authCode = "WY8AFbUNoy4S8FTX4svIw09KXPPL9EGEsC8uA8Fv1UIkdHXFQmQDDJnQ-ejLMMsUA1I9Nwo9dBEAAAGHHd8I4A";

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
                    KakaoTokenIssuanceUri,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            String refreshToken = jsonNode.get("refresh_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();
            Integer refreshTokenExpire = jsonNode.get("refresh_token_expires_in").asInt();
            String scope = jsonNode.get("scope").asText();

            SocialAccess socialAccess = SocialAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshTokenExpire(refreshTokenExpire)
                    .scope(Arrays.asList(scope.split(" ")))
                    .build();

            System.out.println("kakaoAccess = " + socialAccess);
            assertEquals(socialAccess.getTokenType(), "bearer");

        } catch (Exception e){
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void refreshAccessTokenTest(){
        String refreshToken = "iG2W4J_z5TNrlqw163rMXgRd0aIA0IVDjoAgvwqfCj10lwAAAYcd32T9";
        Integer refreshTokenExpire = 1234;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "refresh_token");
            body.add("client_id", ClientId);
            body.add("refresh_token", refreshToken);
            body.add("client_secret", ClientSecret);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    kakaoReissueUri,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            System.out.println("response.getBody() = " + response.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();

            if (jsonNode.has("refresh_token")) {
                refreshToken = jsonNode.get("refresh_token").asText();
                refreshTokenExpire = jsonNode.get("refresh_token_expires_in").asInt();
            }

            SocialAccess socialAccess = SocialAccess.builder()
                                    .tokenType(tokenType)
                                    .accessToken(accessToken)
                                    .refreshToken(refreshToken)
                                    .accessTokenExpire(accessTokenExpire)
                                    .refreshTokenExpire(refreshTokenExpire)
                                    .build();
            System.out.println("kakaoAccess = " + socialAccess);
            assertTrue(true);
        } catch(Exception e){
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void authAccessTokenTest() {
        String accessToken = "d6pKX6_cWkJSpgY-3lquxNy-FfEe_5g3mENsfSquCinJXgAAAYcd9zHK";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("Bearer %s", accessToken));

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(new LinkedMultiValueMap<>(), headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    kakaoAuthUri,
                    HttpMethod.GET,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Long id = jsonNode.get("id").asLong();
            Integer expire = jsonNode.get("expires_in").asInt();
            Integer appId = jsonNode.get("app_id").asInt();

            SocialTokenInfo socialTokenInfo = SocialTokenInfo.builder()
                                            .id(id)
                                            .expire(expire)
                                            .build();

            System.out.println("kakaoTokenInfo = " + socialTokenInfo);
            assertTrue(true);
        } catch (Exception e){
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void expireTokenTest() {
        Long kakaoUserId = 2716479395L;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("KakaoAK %s", adminKey));

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("target_id_type", "user_id");
            body.add("target_id", String.valueOf(kakaoUserId));

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    kakaoExpireUri,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Long id = jsonNode.get("id").asLong();
            System.out.println("id = " + id);

        } catch (Exception e){
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void getUserTest() {
        try {
            String accessToken = "l-i4yqGr2qJR0EdPz3-GHDjllIbGPMSi1LeeR0CnCiolEQAAAYcd-GOR";

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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String kakaoUserId = String.valueOf(jsonNode.get("id").asLong());
            String name = jsonNode.get("kakao_account").get("profile").get("nickname").asText();
            String email = jsonNode.get("kakao_account").get("email").asText();
            String gender = jsonNode.get("kakao_account").get("gender").asText();
            String age = jsonNode.get("kakao_account").get("age_range").asText();
            String birthday = jsonNode.get("kakao_account").get("birthday").asText();

            SocialUser socialUser = SocialUser.builder()
                            .userId(kakaoUserId)
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

            System.out.println(socialUser);
            assertEquals(socialUser.getName(), "박상민");

        } catch (Exception e){
            assertTrue(false);
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

        SocialUser socialUser = SocialUser.builder()
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

        try {
            memberService.findMemberByEmail(socialUser.getEmail());
        } catch (NotFoundException e) {
            String platformCode = CommonCode.KAKAO.getName();
            String password = UUID.randomUUID().toString().replace("-", "");

            memberService.registMember(Member.builder()
                    .platformCode(platformCode)
                    .name(socialUser.getName())
                    .email(socialUser.getEmail())
                    .gender(socialUser.getGender())
                    .age(socialUser.getAge())
                    .birthday(socialUser.getBirthday())
                    .password(password)
                    .build());
        }
    }
}