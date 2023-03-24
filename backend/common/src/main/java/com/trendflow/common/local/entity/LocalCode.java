package com.trendflow.common.local.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "local_code")
public class LocalCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private String code;
    @Column(name = "name")
    private String name;
    @Column(name = "group_code")
    private String groupCode;
    @Column(name = "group_name")
    private String groupName;
}
