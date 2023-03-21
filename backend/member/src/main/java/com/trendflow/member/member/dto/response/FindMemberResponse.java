package com.trendflow.member.member.dto.response;

import com.trendflow.member.member.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FindMemberResponse {
    private Long memberId;
    private Long keywordId;
    private String platformCode;
    private String name;
    private String email;
    private String password;
    private Integer age;
    private LocalDateTime regDt;

    public static FindMemberResponse fromEntity(Member member){
        return FindMemberResponse.builder()
                .memberId(member.getMemberId())
                .keywordId(member.getKeywordId())
                .platformCode(member.getPlatformCode())
                .name(member.getName())
                .email(member.getEmail())
                .password(member.getPassword())
                .age(member.getAge())
                .regDt(member.getRegDt())
                .build();
    }
}
