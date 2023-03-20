package com.trendflow.member.member.controller;

import com.trendflow.member.global.code.MemberCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.global.response.BasicResponse;
import com.trendflow.member.member.dto.response.FindMemberResponse;
import com.trendflow.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/health_check")
    public ResponseEntity<BasicResponse> healthCheck(){
        log.info("healthCheck - Call");

        try {
            return ResponseEntity.ok().body(BasicResponse.Body(MemberCode.SUCCESS, null));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(MemberCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(MemberCode.FAIL, null));
        }
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<BasicResponse> findMember(@PathVariable("memberId") Long memberId){
        log.info("findMember - Call");

        try {
            FindMemberResponse response = memberService.findMember(memberId);
            return ResponseEntity.ok().body(BasicResponse.Body(MemberCode.SUCCESS, response));
        } catch (NotFoundException e){
            return ResponseEntity.badRequest().body(BasicResponse.Body(MemberCode.FAIL, null));
        } catch (RuntimeException e){
            return ResponseEntity.internalServerError().body(BasicResponse.Body(MemberCode.FAIL, null));
        }
    }
}
