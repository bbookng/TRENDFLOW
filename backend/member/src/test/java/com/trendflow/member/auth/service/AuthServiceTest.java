package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.dto.response.RefreshTokenResponse;
import com.trendflow.member.global.exception.UnAuthException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    void kakaoLoginTest() {
        String authCode = "jyDT6mz7cAGnC2rdq00CD4EttqJLK_K7mITyFJLk0gultfAtKDXKkdjLB7T1rzhe-hBocQo9cuoAAAGHJueJXw";
        LoginResponse loginResponse = authService.login("PL100", authCode);
        assertEquals(loginResponse.getName(), "박상민");
    }

    @Test
    void googleLoginTest() {
        String authCode = "4/0AVHEtk7YUbyezBblj59Zli6ypXuzYBGnfjrScIq-XuhkMy_C9k5EvxBEvx2bmtKas3cCUQ";
        LoginResponse loginResponse = authService.login("PL200", authCode);
        assertEquals(loginResponse.getName(), "박상민");
    }

    @Test
    void authTest() {
        try {
            String accessToken = "J4C5MQqayCAsFa7l_tcCI0Lfc84RnaIYJLxyTR_hCisNHwAAAYcm7E8t";
            authService.authAccessToken(accessToken);
            authService.authAccessTokenToKakao(accessToken);
            assertTrue(true);
        } catch (UnAuthException e) {
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void refreshTest() {
        try {
            String refreshToken = "4yncmzBFNZJHjdWwPKhAvDTNcguT9JSx_UBcXmVaCj1ymAAAAYcm6Lca";
            RefreshTokenResponse refreshTokenResponse = authService.refresh(refreshToken);
            System.out.println("refreshTokenResponse = " + refreshTokenResponse);
            assertTrue(true);
        } catch (Exception e) {
            e.printStackTrace();
            assertTrue(false);
        }
    }

    @Test
    void expireTest() {
        try {
            String refreshToken = "4yncmzBFNZJHjdWwPKhAvDTNcguT9JSx_UBcXmVaCj1ymAAAAYcm6Lca";
            authService.logout(refreshToken);
            assertTrue(true);
        } catch (Exception e) {
            e.printStackTrace();
            assertTrue(false);
        }
    }
}