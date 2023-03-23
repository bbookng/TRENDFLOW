package com.trendflow.member.member.service;

import com.trendflow.member.global.code.RoleCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.entity.Role;
import com.trendflow.member.member.repository.MemberRepository;
import com.trendflow.member.member.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final RoleRepository roleRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Member findMember(String email) throws NotFoundException {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException());
    }

    @Transactional
    public Member registMember(Member member) throws RuntimeException {
        memberRepository.save(member);
        roleRepository.save(Role.builder()
                .roleCode(RoleCode.NORMAL.getCode())
                .member(member)
                .build());
        return memberRepository.save(member);
    }
}
