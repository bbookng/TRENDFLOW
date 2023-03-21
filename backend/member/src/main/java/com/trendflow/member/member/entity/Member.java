package com.trendflow.member.member.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
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
    @Column(name = "age")
    private Integer age;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
    @OneToMany
    @JoinColumn(name = "member_id")
    private List<Role> roles;
}
