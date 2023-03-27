package com.trendflow.member.member.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private  Long memberId;
    @Column(name = "keyword_id")
    private Long keywordId;
    @Column(name = "platform_code")
    private String platformCode;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "gender")
    private String gender;
    @Column(name = "age")
    private String age;
    @Column(name = "birthday")
    private String birthday;
    @Column(name = "password")
    private String password;
    @Column(name = "refresh_token")
    private String refreshToken;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToMany(mappedBy = "member")
    private List<Role> roles;
}
