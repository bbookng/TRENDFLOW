package com.trendflow.member.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trendflow.member.auth.dto.authentication.SocialAccess;
import com.trendflow.member.auth.dto.authentication.SocialTokenInfo;
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
public class KakaoAuthService {
    private final MemberService memberService;
    private final CommonService commonService;
    @Value("${login.kakao.admin-key}")
    private String ADMIN_KEY;
    @Value("${login.kakao.client-id}")
    private String CLIENT_ID;
    @Value("${login.kakao.client-secret}")
    private String CLIENT_SECRET;
    @Value("${login.kakao.redirect-uri}")
    private String REDIRECT_URI;
    @Value("${login.kakao.token-issuance-uri}")
    private String KAKAO_TOKEN_ISSUANCE_URI;
    @Value("${login.kakao.token-reissue-uri}")
    private String KAKAO_REISSUE_URI;
    @Value("${login.kakao.token-expire-uri}")
    private String KAKAO_EXPIRE_URI;
    @Value("${login.kakao.token-auth-uri}")
    private String KAKAO_AUTH_URI;
    @Value("${login.kakao.info-uri}")
    private String KAKAO_INFO_URI;

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
                    KAKAO_TOKEN_ISSUANCE_URI,
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
                    KAKAO_REISSUE_URI,
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
                    KAKAO_AUTH_URI,
                    HttpMethod.GET,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            Long id = jsonNode.get("id").asLong();
            Integer expire = jsonNode.get("expires_in").asInt();

            return SocialTokenInfo.builder()
                    .id(id)
                    .expire(expire)
                    .build();

        } catch (JsonProcessingException | HttpClientErrorException e) {
            e.printStackTrace();
            throw new UnAuthException(AuthCode.KAKAO_AUTH_TOKEN_FAIL);
        }
    }

    public void expireToken(String accessToken) throws UnAuthException {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", String.format("Bearer %s", accessToken));

            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
            RestTemplate rt = new RestTemplate();
            ResponseEntity<String> response = rt.exchange(
                    KAKAO_EXPIRE_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

        } catch (HttpClientErrorException e) {
            log.info("Expire Fail");
        } catch (RuntimeException e) {
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
                    KAKAO_INFO_URI,
                    HttpMethod.POST,
                    kakaoTokenRequest,
                    String.class
            );

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String kakaoUserId = String.valueOf(jsonNode.get("id").asLong());
            String name = jsonNode.get("kakao_account").get("profile").get("nickname").asText();
            String email = jsonNode.get("kakao_account").get("email").asText();


            String gender = "";
            String age = "";
            String birthday = "";
            if (jsonNode.get("kakao_account").has("gender")) gender = jsonNode.get("kakao_account").get("gender").asText();
            if (jsonNode.get("kakao_account").has("age")) gender = jsonNode.get("kakao_account").get("age_range").asText();
            if (jsonNode.get("kakao_account").has("birthday")) gender = jsonNode.get("kakao_account").get("birthday").asText();


            return SocialUser.builder()
                    .userId(kakaoUserId)
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

    public Member getMember(SocialUser socialUser) throws RuntimeException {
        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();

        try {
            return memberService.findMemberByEmail(socialUser.getEmail());
        } catch (NotFoundException e) {
            String platformCode = KAKAO;
            String password = UUID.randomUUID().toString().replace("-", "");

            return memberService.registMember(Member.builder()
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
