package com.trendflow.member.auth.dto.authentication;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SocialUser {
    private String name;
    private String email;
    private Long kakaoUserId;
    private String gender;
    private String age;
    private String birthday;
}
