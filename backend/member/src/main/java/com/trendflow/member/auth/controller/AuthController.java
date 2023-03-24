package com.trendflow.member.auth.controller;

import com.trendflow.member.auth.dto.request.LoginRequest;
import com.trendflow.member.auth.dto.response.LoginResponse;
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

        log.info(loginRequest.toString());

        try {
            LoginResponse loginResponse = authService.login(loginRequest);
            log.info(loginResponse.toString());
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, loginResponse));
        } catch (UnAuthException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(e.getCode(), null));
        } catch (RuntimeException e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<BasicResponse> logout(@RequestHeader(value = "Authorization", required = false) String accessToken,
                                                @RequestHeader(value = "RefreshToken", required = false) String refreshToken){
        log.info("logout - Call");

        try {
            authService.logout(accessToken, refreshToken);
            return ResponseEntity.ok().body(BasicResponse.Body(AuthCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(AuthCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(AuthCode.FAIL, null));
        }
    }
}
