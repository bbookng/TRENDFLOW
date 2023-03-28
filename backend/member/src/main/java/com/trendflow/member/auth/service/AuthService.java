package com.trendflow.member.auth.service;

import com.trendflow.member.auth.dto.authentication.*;
import com.trendflow.member.auth.dto.response.LoginResponse;
import com.trendflow.member.auth.dto.response.RefreshTokenResponse;
import com.trendflow.member.global.code.AuthCode;
import com.trendflow.member.global.code.CommonCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.global.redis.session.*;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.entity.Token;
import com.trendflow.member.member.repository.MemberRepository;
import com.trendflow.member.member.repository.TokenRepository;
import com.trendflow.member.msa.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final LoginRefreshTokenRepository loginRefreshTokenRepository;
    private final LoginAccessTokenRepository loginAccessTokenRepository;
    private final TokenRepository tokenRepository;
    private final KakaoAuthService kakaoAuthService;
    private final GoogleAuthService googleAuthService;
    private final CommonService commonService;

    public LoginResponse login(String platformCode, String authCode) throws RuntimeException {
        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();
        String GOOGLE = commonService.getLocalCode(CommonCode.GOOGLE.getName()).getCode();

        Member member = null;
        SocialUser socialUser = null;
        SocialAccess socialAccess = null;
        
        // 카카오 소셜 로그인
        if (KAKAO.equals(platformCode)){
            socialAccess = kakaoAuthService.getAccessToken(authCode);
            socialUser = kakaoAuthService.getUser(socialAccess.getAccessToken());
            member = kakaoAuthService.getMember(socialUser);

            // DB에 남아있는 토큰 정보가 캐시에 있으면 삭제
            try {
                Token token = tokenRepository.findById(member.getMemberId())
                        .orElseThrow(() -> new NotFoundException());
                LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(token.getRefreshToken())
                        .orElseThrow(() -> new NotFoundException());

                String accessToken = loginRefreshToken.getAccessToken();
                String refreshToken = token.getRefreshToken();
                loginAccessTokenRepository.deleteById(accessToken);
                loginRefreshTokenRepository.deleteById(refreshToken);
            } catch (NotFoundException e) {
                log.warn("Not found Token in DB");
            }
        } 
        // 구글 소셜 로그인
        else if (GOOGLE.equals(platformCode)){
            socialAccess = googleAuthService.getAccessToken(authCode);
            socialUser = googleAuthService.getUser(socialAccess.getAccessToken());
            member = googleAuthService.getMember(socialUser);

            // 기존 리프레시 토큰 재사용
            // 캐시에서 리프레시 토큰을 제외하고 모두 삭제
            if (socialAccess.getRefreshToken() == null) {
                Token token = tokenRepository.findByMemberId(member.getMemberId())
                        .orElseThrow(() -> new UnAuthException(AuthCode.SEARCH_REFRESH_TOKEN_FAIL));

                if (LocalDateTime.now().isAfter(token.getExpireDt()))
                    throw new UnAuthException(AuthCode.SEARCH_REFRESH_TOKEN_FAIL);

                Long expire = Duration.between(LocalDateTime.now(), token.getExpireDt()).getSeconds();
                socialAccess.setRefreshToken(token.getRefreshToken());
                socialAccess.setRefreshTokenExpire(Long.valueOf(expire).intValue());

                LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(socialAccess.getRefreshToken())
                        .orElseThrow(() -> new UnAuthException(AuthCode.SEARCH_REFRESH_TOKEN_FAIL));

                // 현재 활성화 되어 있는 엑세스 토큰 만료 시킴
                loginAccessTokenRepository.save(LoginAccessToken.builder()
                        .accessToken(loginRefreshToken.getAccessToken())
                        .accessExpire(loginRefreshToken.getAccessExpire())
                        .refreshToken(socialAccess.getRefreshToken())
                        .memberId(loginRefreshToken.getMemberId())
                        .isValid(false)
                        .build());
            } 
            // 새로운 리프레시 토큰 (기존 토큰 캐시에서 제거) -> 리프레시가 만료된 경우만 적용
            // 캐시에서 관련된 모든 토큰 삭제 (초기화)
            else {
                try {
                    Token token = tokenRepository.findByMemberId(member.getMemberId())
                            .orElseThrow(() -> new NotFoundException());
                    LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(token.getRefreshToken())
                            .orElseThrow(() -> new NotFoundException());

                    // 활성화된 리프레시 토큰 만료 시킴 (엑세스 토큰도 같이 만료됨)
                    googleAuthService.expireToken(token.getRefreshToken());
                    // 활성화된 엑세스 토큰 삭제
//                    loginAccessTokenRepository.deleteById(socialAccess.getAccessToken());
                    // 활성화된 리프레시 토큰 삭제
                    loginRefreshTokenRepository.deleteById(token.getRefreshToken());
                } catch (NotFoundException e){
                    log.warn("Not found Token in DB");
                }
            }
        }

        // 플랫폼 코드 인식 불가
        else throw new UnAuthException(AuthCode.PLATFORM_FAIL);

        // 세션 캐시에 로그인 정보 (RefreshToken) 저장
        loginRefreshTokenRepository.saveLogin(LoginRefreshToken.builder()
                .refreshToken(socialAccess.getRefreshToken())
                .refreshTokenExpire(socialAccess.getRefreshTokenExpire())
                .refreshExpire(LocalDateTime.now().plusSeconds(socialAccess.getRefreshTokenExpire()))
                .accessToken(socialAccess.getAccessToken())
                .accessTokenExpire(socialAccess.getAccessTokenExpire())
                .accessExpire(LocalDateTime.now().plusSeconds(socialAccess.getAccessTokenExpire()))
                .memberId(member.getMemberId())
                .platformCode(platformCode)
                .platformUserId(socialUser.getUserId())
                .build());

        // 세션 캐시에 로그인 정보 (AccessToken) 저장
        loginAccessTokenRepository.save(LoginAccessToken.builder()
                .accessToken(socialAccess.getAccessToken())
                .accessExpire(LocalDateTime.now().plusSeconds(socialAccess.getAccessTokenExpire()))
                .refreshToken(socialAccess.getRefreshToken())
                .memberId(member.getMemberId())
                .isValid(true)
                .build());

        // DB 에 로그인 정보 (RefreshToken) 저장
        tokenRepository.save(Token.builder()
                        .memberId(member.getMemberId())
                        .refreshToken(socialAccess.getRefreshToken())
                        .expire(socialAccess.getRefreshTokenExpire())
                        .expireDt(LocalDateTime.now().plusSeconds(socialAccess.getRefreshTokenExpire()))
                        .regDt(LocalDateTime.now())
                        .build());

        // 로그인 정보 응답 객체 생성
        return LoginResponse.builder()
                .name(member.getName())
                .accessToken(socialAccess.getAccessToken())
                .refreshToken(socialAccess.getRefreshToken())
                .build();
    }

    public RefreshTokenResponse refresh(String refreshToken) throws RuntimeException {

        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();
        String GOOGLE = commonService.getLocalCode(CommonCode.GOOGLE.getName()).getCode();

        // 세션 캐시에서 로그인 정보 조회
        LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(refreshToken)
                .orElseThrow(() -> new UnAuthException(AuthCode.SEARCH_TOKEN_FAIL));

        SocialAccess socialAccess = null;

        try {
            // 카카오 엑세스 토큰 갱신
            if (KAKAO.equals(loginRefreshToken.getPlatformCode())) {
                socialAccess = kakaoAuthService.refreshAccessToken(
                        loginRefreshToken.getRefreshToken(),
                        loginRefreshToken.getRefreshTokenExpire());

            }
            // 구글 엑세스 토큰 갱신
            else if (GOOGLE.equals(loginRefreshToken.getPlatformCode())) {
                socialAccess = googleAuthService.refreshAccessToken(
                        loginRefreshToken.getRefreshToken(),
                        loginRefreshToken.getRefreshTokenExpire());
            }
            // 플랫폼 코드 인식 불가
            else throw new UnAuthException(AuthCode.PLATFORM_FAIL);

        } catch (HttpClientErrorException e) {
            tokenRepository.deleteByMemberId(loginRefreshToken.getMemberId());
            throw new UnAuthException(AuthCode.SEARCH_REFRESH_TOKEN_FAIL);
        }

        // 새로운 엑세스 토큰 등록
        loginAccessTokenRepository.save(LoginAccessToken.builder()
                .accessToken(socialAccess.getAccessToken())
                .accessExpire(LocalDateTime.now().plusSeconds(socialAccess.getAccessTokenExpire()))
                .refreshToken(socialAccess.getRefreshToken())
                .memberId(loginRefreshToken.getMemberId())
                .isValid(true)
                .build());

        // 새로운 토큰으로 변경
        loginRefreshTokenRepository.saveRefresh(LoginRefreshToken.builder()
                .refreshToken(socialAccess.getRefreshToken())
                .refreshTokenExpire(socialAccess.getRefreshTokenExpire())
                .refreshExpire(loginRefreshToken.getRefreshExpire())
                .accessToken(socialAccess.getAccessToken())
                .accessTokenExpire(socialAccess.getAccessTokenExpire())
                .accessExpire(LocalDateTime.now().plusSeconds(socialAccess.getAccessTokenExpire()))
                .memberId(loginRefreshToken.getMemberId())
                .platformCode(KAKAO)
                .platformUserId(loginRefreshToken.getPlatformUserId())
                .build());

        // 기존의 엑세스 토큰을 무효화
        loginAccessTokenRepository.save(LoginAccessToken.builder()
                .accessToken(loginRefreshToken.getAccessToken())
                .accessExpire(loginRefreshToken.getAccessExpire())
                .refreshToken(socialAccess.getRefreshToken())
                .memberId(loginRefreshToken.getMemberId())
                .isValid(false)
                .build());

        return RefreshTokenResponse.builder()
                .accessToken(socialAccess.getAccessToken())
                .refreshToken(socialAccess.getRefreshToken())
                .build();
    }

    // 1단계 인증 (상위 인증)
    public void authAccessTokenToKakao(String accessToken) throws RuntimeException {

        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();
        String GOOGLE = commonService.getLocalCode(CommonCode.GOOGLE.getName()).getCode();

        // 엑세스 토큰으로 리프레시 토큰 조회
        LoginAccessToken loginAccessToken = loginAccessTokenRepository.findById(accessToken)
                .orElseThrow(() -> new UnAuthException(AuthCode.INVALID_TOKEN_FAIL));

        if (!loginAccessToken.getIsValid()) throw new UnAuthException(AuthCode.INVALID_TOKEN_FAIL);

        // 리프레시 토큰 정보 조회
        LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(loginAccessToken.getRefreshToken())
                .orElseThrow(() -> new UnAuthException(AuthCode.INVALID_TOKEN_FAIL));

        // 소셜 인증 서버로 토큰 정보 요청
        SocialTokenInfo socialTokenInfo = null;
        // 카카오 토큰 인증
        if (KAKAO.equals(loginRefreshToken.getPlatformCode())) socialTokenInfo = kakaoAuthService.authAccessToken(accessToken);
        // 구글 토큰 인증
        else if (GOOGLE.equals(loginRefreshToken.getPlatformCode())) socialTokenInfo = googleAuthService.authAccessToken(accessToken);

        // 응답 토큰 정보 ID 비교 확인
        if (!socialTokenInfo.getId().equals(loginRefreshToken.getPlatformUserId())){
            throw new UnAuthException(AuthCode.INVALID_TOKEN_FAIL);
        }
    }

    // 2단계 인증 (하위 인증)
    public void authAccessToken(String accessToken) throws RuntimeException {
        LoginAccessToken loginAccessToken = loginAccessTokenRepository.findById(accessToken)
                .orElseThrow(() -> new UnAuthException(AuthCode.INVALID_TOKEN_FAIL));

        // accessToken 만료 시킨 토큰인 경우
        if (!loginAccessToken.getIsValid()) throw new UnAuthException(AuthCode.INVALID_TOKEN_FAIL);

        LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(loginAccessToken.getRefreshToken())
                .orElseThrow(() -> new UnAuthException(AuthCode.INVALID_TOKEN_FAIL));

        // 엑세스 토큰의 만료시간이 지난 경우 (토큰이 만료된 경우)
        if (LocalDateTime.now().isAfter(loginRefreshToken.getAccessExpire())){
            throw new UnAuthException(AuthCode.INVALID_TOKEN_FAIL);
        }
    }

    public void logout(String refreshToken) throws RuntimeException {

        String KAKAO = commonService.getLocalCode(CommonCode.KAKAO.getName()).getCode();
        String GOOGLE = commonService.getLocalCode(CommonCode.GOOGLE.getName()).getCode();

        LoginRefreshToken loginRefreshToken = loginRefreshTokenRepository.findById(refreshToken)
                .orElseThrow(() -> new UnAuthException(AuthCode.SEARCH_TOKEN_FAIL));

        LoginAccessToken loginAccessToken = loginAccessTokenRepository.findById(loginRefreshToken.getAccessToken())
                .orElseThrow(() -> new UnAuthException(AuthCode.SEARCH_TOKEN_FAIL));

        if (KAKAO.equals(loginRefreshToken.getPlatformCode())) {
            kakaoAuthService.expireToken(loginRefreshToken.getPlatformUserId());
        }
        // 구글 소셜 로그인
        else if (GOOGLE.equals(loginRefreshToken.getPlatformCode())){
            googleAuthService.expireToken(refreshToken);
        }

        // 현재 엑세스 토큰 만료 시킴
        loginAccessTokenRepository.save(LoginAccessToken.builder()
                .accessToken(loginAccessToken.getAccessToken())
                .accessExpire(loginAccessToken.getAccessExpire())
                .refreshToken(loginAccessToken.getRefreshToken())
                .memberId(loginAccessToken.getMemberId())
                .isValid(false)
                .build());

        // 현재 리프레시 토큰 삭제
        loginRefreshTokenRepository.deleteById(refreshToken);
    }
}
