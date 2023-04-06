package com.trendflow.common.local.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "relate_code")
public class RelateCode {
    @Id
    @Column(name = "platform_code")
    private String platformCode;
    @Column(name = "code")
    private String code;
}
