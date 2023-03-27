package com.trendflow.member.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.auth.dto.authentication.KakaoAccess;
import com.trendflow.member.auth.dto.authentication.KakaoTokenInfo;
import com.trendflow.member.auth.dto.authentication.KakaoUser;
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
public class KakaoAuthService {
    private final MemberService memberService;
    private final CommonService commonService;
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

    public KakaoAccess getAccessToken(String authCode) throws UnAuthException {
        try {
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

            return KakaoAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshTokenExpire(refreshTokenExpire)
                    .scope(Arrays.asList(scope.split(" ")))
                    .build();

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new UnAuthException(AuthCode.KAKAO_GET_TOKEN_FAIL);
        } catch (HttpClientErrorException e) {
            e.printStackTrace();
            throw new UnAuthException(AuthCode.KAKAO_GET_TOKEN_FAIL);
        }
    }

    public KakaoAccess refreshAccessToken(String refreshToken, Integer refreshTokenExpire) throws UnAuthException {
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

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String tokenType = jsonNode.get("token_type").asText();
            String accessToken = jsonNode.get("access_token").asText();
            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();

            if (jsonNode.has("refresh_token")) {
                refreshToken = jsonNode.get("refresh_token").asText();
                refreshTokenExpire = jsonNode.get("refresh_token_expires_in").asInt();
            }

            return KakaoAccess.builder()
                    .tokenType(tokenType)
                    .accessToken(accessToken)
                    .accessTokenExpire(accessTokenExpire)
                    .refreshToken(refreshToken)
                    .refreshTokenExpire(refreshTokenExpire)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_AUTH_TOKEN_FAIL);
        }
    }

    public KakaoTokenInfo authAccessToken(String accessToken) throws UnAuthException {
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

            return KakaoTokenInfo.builder()
                    .id(id)
                    .expire(expire)
                    .appId(appId)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_AUTH_TOKEN_FAIL);
        }
    }

    public Long expireToken(Long kakaoUserId) throws UnAuthException {
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
            return id;

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_LOGOUT_FAIL);
        }

    }

    public KakaoUser getUser(String accessToken) throws UnAuthException {
        try {
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

            Long kakaoUserId = jsonNode.get("id").asLong();
            String name = jsonNode.get("kakao_account").get("profile").get("nickname").asText();
            String email = jsonNode.get("kakao_account").get("email").asText();
            String gender = jsonNode.get("kakao_account").get("gender").asText();
            String age = jsonNode.get("kakao_account").get("age_range").asText();
            String birthday = jsonNode.get("kakao_account").get("birthday").asText();

            return KakaoUser.builder()
                    .kakaoUserId(kakaoUserId)
                    .name(name)
                    .email(email)
                    .gender(gender)
                    .age(age)
                    .birthday(birthday)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            throw new UnAuthException(AuthCode.KAKAO_GET_USER_FAIL);
        }
    }

    public Member getMember(KakaoUser kakaoUser) throws RuntimeException {
        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();

        try {
            return memberService.findMember(kakaoUser.getEmail());
        } catch (NotFoundException e) {
            String platformCode = KAKAO;
            String password = UUID.randomUUID().toString().replace("-", "");

            return memberService.registMember(Member.builder()
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
