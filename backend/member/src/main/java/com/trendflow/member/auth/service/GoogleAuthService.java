//package com.trendflow.member.auth.service;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.trendflow.member.auth.dto.authentication.GoogleAccess;
//import com.trendflow.member.auth.dto.authentication.KakaoAccess;
//import com.trendflow.member.global.code.AuthCode;
//import com.trendflow.member.global.exception.UnAuthException;
//import com.trendflow.member.member.service.MemberService;
//import com.trendflow.member.msa.service.CommonService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.Arrays;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class GoogleAuthService {
//    private final MemberService memberService;
//    private final CommonService commonService;
//    @Value("${login.google.client-id}")
//    private String ClientId;
//    @Value("${login.google.client-secret}")
//    private String ClientSecret;
//    @Value("${login.google.redirect-uri}")
//    private String RedirectUri;
//    @Value("${login.google.token-issuance-uri}")
//    private String GoogleTokenIssuanceUri;
//    @Value("${login.google.token-reissue-uri}")
//    private String GoogleReissueUri;
//    @Value("${login.google.token-expire-uri}")
//    private String GoogleExpireUri;
//    @Value("${login.google.token-auth-uri}")
//    private String GoogleAuthUri;
//    @Value("${login.google.info-uri}")
//    private String GoogleInfoUri;
//
//    public GoogleAccess getAccessToken(String authCode) throws UnAuthException {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//
//            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//            body.add("code", authCode);
//            body.add("grant_type", "authorization_code");
//            body.add("client_id", ClientId);
//            body.add("redirect_uri", RedirectUri);
//            body.add("client_secret", ClientSecret);
//
//            HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
//            RestTemplate rt = new RestTemplate();
//            ResponseEntity<String> response = rt.exchange(
//                    GoogleTokenIssuanceUri,
//                    HttpMethod.POST,
//                    kakaoTokenRequest,
//                    String.class
//            );
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode jsonNode = objectMapper.readTree(response.getBody());
//
//            String tokenType = jsonNode.get("token_type").asText();
//            String accessToken = jsonNode.get("access_token").asText();
//            Integer accessTokenExpire = jsonNode.get("expires_in").asInt();
//            String scope = jsonNode.get("scope").asText();
//            String refreshToken;
//            if (jsonNode.has("refresh_token")) {
//                refreshToken = jsonNode.get("refresh_token").asText();
//            } else {
//
//
//
//            }
//
//            return GoogleAccess.builder()
//                    .tokenType(tokenType)
//                    .accessToken(accessToken)
//                    .refreshToken(refreshToken)
//                    .scope(Arrays.asList(scope.split(" ")))
//                    .build();
//
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            throw new UnAuthException(AuthCode.KAKAO_GET_TOKEN_FAIL);
//        } catch (HttpClientErrorException e) {
//            e.printStackTrace();
//            throw new UnAuthException(AuthCode.KAKAO_GET_TOKEN_FAIL);
//        }
//    }
//
//}
