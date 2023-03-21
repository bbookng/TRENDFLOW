package com.trendflow.member.member.service;

import com.trendflow.member.global.exception.NotFoundException;
import com.trendflow.member.member.entity.Member;
import com.trendflow.member.member.entity.Role;
import com.trendflow.member.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @Transactional
    void findMemberTest() {
        Member member = memberRepository.findById(3L)
                .orElseThrow(() -> new NotFoundException());
        assertEquals(member.getName(), "박상민");
        assertEquals(member.getRoles().size(), 2);
    }

}