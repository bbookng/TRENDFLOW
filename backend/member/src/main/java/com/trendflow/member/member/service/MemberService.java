package com.trendflow.member.member.service;

import com.trendflow.member.global.code.CommonCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.entity.Role;
import com.trendflow.member.member.repository.MemberRepository;
import com.trendflow.member.member.repository.RoleRepository;
import com.trendflow.member.msa.dto.response.LocalCode;
import com.trendflow.member.msa.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final RoleRepository roleRepository;
    private final MemberRepository memberRepository;
    private final CommonService commonService;

    @Transactional(readOnly = true)
    public Member findMember(String email) throws NotFoundException {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException());
    }

    @Transactional
    public Member registMember(Member member) throws RuntimeException {
        LocalCode normalRole = commonService.getLocalCode(CommonCode.NORMAL_USER.getName());

        memberRepository.save(member);
        roleRepository.save(Role.builder()
                .roleCode(normalRole.getCode())
                .member(member)
                .build());
        return memberRepository.save(member);
    }
}
