package com.trendflow.member.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.auth.dto.authentication.SocialTokenInfo;
import com.trendflow.member.auth.dto.authentication.SocialAccess;
import com.trendflow.member.auth.dto.authentication.SocialUser;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.code.CommonCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.service.MemberService;
import com.trendflow.member.msa.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

import java.util.Arrays;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoogleAuthService {
    private final MemberService memberService;
    private final CommonService commonService;

    @Value("${login.google.refresh-expire}")
    private Integer refreshExpire;
    @Value("${login.google.client-id}")
    private String CLIENT_ID;
    @Value("${login.google.client-secret}")
    private String CLIENT_SECRET;
    @Value("${login.google.redirect-uri}")
    private String REDIRECT_URI;
    @Value("${login.google.token-issuance-uri}")
    private String GOOGLE_TOKEN_ISSUANCE_URI;
    @Value("${login.google.token-reissue-uri}")
    private String GOOGLE_REISSUE_URI;
    @Value("${login.google.token-expire-uri}")
    private String GOOGLE_EXPIRE_URI;
    @Value("${login.google.token-auth-uri}")
    private String GOOGLE_AUTH_URI;
    @Value("${login.google.info-uri}")
    private String GOOGLE_INFO_URI;

    public SocialAccess getAccessToken(String authCode) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("code", authCode);
            body.add("grant_type", "authorization_code");
            body.add("client_id", CLIENT_ID);
            body.add("redirect_uri", REDIRECT_URI);
            body.add("client_secret", CLIENT_SECRET);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    GOOGLE_TOKEN_ISSUANCE_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();
            String scope = jsonNode.get("scope").asText();

            String refreshToken = null;
            Integer refreshTokenExpire = null;
            if (jsonNode.has("refresh_token")) {
                refreshToken = jsonNode.get("refresh_token").asText();
                refreshTokenExpire = refreshExpire;
            }

            return SocialAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshTokenExpire(refreshTokenExpire)
                    .scope(Arrays.asList(scope.split(" ")))
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_GET_TOKEN_FAIL);
        }
    }

    public SocialAccess refreshAccessToken(String refreshToken, Integer refreshTokenExpire) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("grant_type", "refresh_token");
            body.add("client_id", CLIENT_ID);
            body.add("refresh_token", refreshToken);
            body.add("client_secret", CLIENT_SECRET);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    GOOGLE_REISSUE_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();

            return SocialAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshToken(refreshToken)
                    .refreshTokenExpire(refreshTokenExpire)
                    .build();

        } catch (JsonProcessingException e) {
            throw new UnAuthException(AuthCode.KAKAO_AUTH_TOKEN_FAIL);
        }
    }

    public SocialTokenInfo authAccessToken(String accessToken) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("Bearer %s", accessToken));

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(new LinkedMultiValueMap<>(), headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    GOOGLE_AUTH_URI,
                    HttpMethod.GET,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Long id = Long.parseLong(jsonNode.get("sub").asText());
            Integer expire = jsonNode.get("expires_in").asInt();

            return SocialTokenInfo.builder()
                    .id(id)
                    .expire(expire)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_AUTH_TOKEN_FAIL);
        }
    }

    public void expireToken(String refreshToken) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("token", refreshToken);

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    GOOGLE_EXPIRE_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

        } catch (HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_LOGOUT_FAIL);
        }
    }

    public SocialUser getUser(String accessToken) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("Bearer %s", accessToken));

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(new LinkedMultiValueMap<>(), headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    GOOGLE_INFO_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String googleUserId = jsonNode.get("sub").asText();
            String name = jsonNode.get("name").asText();
            String email = jsonNode.get("email").asText();

            return SocialUser.builder()
                    .userId(googleUserId)
                    .name(name)
                    .email(email)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_GET_USER_FAIL);
        }
    }

    public Member getMember(SocialUser socialUser) throws RuntimeException {
        String GOOGLE = commonService.getLocalCode(CommonCode.GOOGLE.getName()).getCode();

        try {
            return memberService.findMember(socialUser.getEmail());
        } catch (NotFoundException e) {
            String platformCode = GOOGLE;
            String password = UUID.randomUUID().toString().replace("-", "");

            return memberService.registMember(Member.builder()
                    .platformCode(platformCode)
                    .name(socialUser.getName())
                    .email(socialUser.getEmail())
                    .password(password)
                    .build());
        }
    }

}
