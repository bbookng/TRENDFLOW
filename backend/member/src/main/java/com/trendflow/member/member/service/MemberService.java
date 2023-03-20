package com.trendflow.member.member.service;

import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.dto.response.FindMemberResponse;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public FindMemberResponse findMember(Long memberId){

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException());

        return FindMemberResponse.fromEntity(member);
    }
}
