package com.trendflow.member.auth.dto.authentication;

import com.trendflow.member.member.entity.Role;
import lombok.Builder;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class KakaoUser {
    private Long kakaoUserId;
    private String name;
    private String email;
    private String gender;
    private String age;
    private String birthday;
}
