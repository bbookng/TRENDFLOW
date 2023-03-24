package com.trendflow.member.member.service;

import com.trendflow.member.auth.dto.authentication.KakaoUser;
import com.trendflow.member.global.code.PlatformCode;
import com.trendflow.member.global.code.RoleCode;
import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.entity.Role;
import com.trendflow.member.member.repository.MemberRepository;
import com.trendflow.member.member.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    @Transactional
    void findMemberTest() {
        Member member = memberRepository.findById(16L)
                .orElseThrow(() -> new NotFoundException());
        assertEquals(member.getName(), "박상민");
        assertEquals(member.getRoles().size(), 1);
    }

    @Test
    @Transactional
    void registMemberTest() {
        String name = "박상민";                    // nickname
        String email = "tablemin@kakao.com";     // email
        String gender = "male";                  // gender
        String age = "20~29";                    // age_range
        String birthday = "0506";                // birthday
        String password = UUID.randomUUID().toString().replace("-", "");

        KakaoUser kakaoUser = KakaoUser.builder()
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

        Member member = Member.builder()
                .platformCode(PlatformCode.KAKAO.getCode())
                .name(kakaoUser.getName())
                .email(kakaoUser.getEmail())
                .gender(kakaoUser.getGender())
                .age(kakaoUser.getAge())
                .birthday(kakaoUser.getBirthday())
                .password(password)
                .build();
        memberRepository.save(member);

        roleRepository.save(Role.builder()
                .roleCode(RoleCode.NORMAL.getCode())
                .member(member)
                .build());
    }

}