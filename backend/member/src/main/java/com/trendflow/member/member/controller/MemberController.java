package com.trendflow.member.member.controller;

import com.trendflow.member.global.exception.UnAuthException;
import com.trendflow.member.member.dto.request.RegistBookmarkRequest;
import com.trendflow.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/bookmark")
    public ResponseEntity<String> findBookmark(@RequestHeader("Authorization") String accessToken) {

        try {
            accessToken = accessToken.substring(7);
            String keyword = memberService.findBookmark(accessToken);
            return ResponseEntity.ok().body(keyword);
        } catch (UnAuthException e){
            log.error(e.getCode().toString());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PostMapping("/bookmark")
    public ResponseEntity<?>  registBookmark(@RequestHeader("Authorization") String accessToken,
                                             @RequestBody RegistBookmarkRequest registBookmarkRequest) {
        try {
            log.info(registBookmarkRequest.toString());

            accessToken = accessToken.substring(7);
            String keyword = registBookmarkRequest.getKeyword();
            memberService.registBookmark(accessToken, keyword);
            return ResponseEntity.ok().body(null);
        } catch (UnAuthException e){
            log.error(e.getCode().toString());
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e){
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

}
