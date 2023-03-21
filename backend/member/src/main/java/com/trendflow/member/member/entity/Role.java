package com.trendflow.member.member.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;
    @Column(name = "role_code")
    private String roleCode;
    @Column(name = "member_id")
    private Long memberId;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
}
