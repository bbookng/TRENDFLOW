package com.trendflow.member.member.service;

import com.trendflow.member.auth.dto.authentication.SocialUser;
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
        String platformCode = "KAKAO";
        String roleCode = "NORMAL_USER";
        String name = "박상민";                    // nickname
        String email = "tablemin@kakao.com";     // email
        String gender = "male";                  // gender
        String age = "20~29";                    // age_range
        String birthday = "0506";                // birthday
        String password = UUID.randomUUID().toString().replace("-", "");

        SocialUser socialUser = SocialUser.builder()
                            .name(name)
                            .email(email)
                            .gender(gender)
                            .age(age)
                            .birthday(birthday)
                            .build();

        Member member = Member.builder()
                .platformCode(platformCode)
                .name(socialUser.getName())
                .email(socialUser.getEmail())
                .gender(socialUser.getGender())
                .age(socialUser.getAge())
                .birthday(socialUser.getBirthday())
                .password(password)
                .build();
        memberRepository.save(member);

        roleRepository.save(Role.builder()
                .roleCode(roleCode)
                .member(member)
                .build());
    }

}