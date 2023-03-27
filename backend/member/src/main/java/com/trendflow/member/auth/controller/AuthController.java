package com.trendflow.member.auth.controller;

import com.trendflow.member.auth.dto.request.LoginRequest;
import com.trendflow.member.auth.dto.response.AuthAccessTokenResponse;
import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.dto.response.RefreshTokenResponse;
import com.trendflow.member.auth.service.AuthService;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<BasicResponse> login(@RequestBody LoginRequest loginRequest){
        log.info("login - Call");

        try {
            String accessToken = loginRequest.getPlatformCode();
            String authCode = loginRequest.getAuthCode();
            LoginResponse loginResponse = authService.login(accessToken, authCode);
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, loginResponse));
        } catch (UnAuthException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getCode(), null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<BasicResponse> refresh(@RequestHeader(value = "RefreshToken", required = false) String refreshToken){
        log.info("refresh - Call");

        try {
            RefreshTokenResponse refreshTokenResponse = authService.refresh(refreshToken);
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, refreshTokenResponse));
        } catch (UnAuthException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getCode(), null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }

    @GetMapping("/auth/{level}/{accessToken}")
    public ResponseEntity<AuthAccessTokenResponse> authAccessToken(@PathVariable String level,
                                                                   @PathVariable String accessToken){
        log.info("authAccessToken - Call");

        try {
            // 1단계 인증
            if ("v1".equals(level)) authService.authAccessTokenToKakao(accessToken);
            // 2단계 인증
            if ("v2".equals(level)) authService.authAccessToken(accessToken);
            return ResponseEntity.ok().body(AuthAccessTokenResponse.builder().isValid(true).build());
        } catch (UnAuthException e){
            log.error(e.getMessage());
            return ResponseEntity.ok().body(AuthAccessTokenResponse.builder().isValid(false).build());
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<BasicResponse> logout(@RequestHeader(value = "RefreshToken", required = false) String refreshToken){
        log.info("logout - Call");

        try {
            authService.logout(refreshToken);
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, null));
        } catch (NotFoundException e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(BasicResponse.Body(AuthCode.FAIL, null));
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }
}
