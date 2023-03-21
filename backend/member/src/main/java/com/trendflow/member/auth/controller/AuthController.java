package com.trendflow.member.auth.controller;

import com.trendflow.member.auth.dto.request.LoginRequest;
import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.service.AuthService;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.global.response.BasicResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<BasicResponse> login(LoginRequest loginRequest){
        log.info("login - Call");

        try {
            LoginResponse loginResponse = authService.login(loginRequest);
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, loginResponse));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(AuthCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }
}
