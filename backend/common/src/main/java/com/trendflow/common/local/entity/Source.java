package com.trendflow.common.local.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@Table(name = "source")
public class Source {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "source_id")
    private Long sourceId;
    @Column(name = "brand_id")
    private Long brandId;
    @Column(name = "platform_code")
    private String platformCode;
    @Column(name = "title")
    private String title;
    @Column(name = "link")
    private String link;
    @Column(name = "content")
    private String content;
    @Column(name = "reg_dt")
    private LocalDate regDt;
    @Column(name = "thumb_img")
    private String thumbImg;
}
