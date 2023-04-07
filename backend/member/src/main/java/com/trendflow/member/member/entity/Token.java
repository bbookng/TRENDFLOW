package com.trendflow.member.member.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "token")
public class Token {
    @Id
    @Column(name = "member_id")
    private Long memberId;
    @Column(name = "refresh_token")
    private String refreshToken;
    @Column(name = "expire")
    private Integer expire;
    @Column(name = "expire_dt")
    private LocalDateTime expireDt;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;


}
