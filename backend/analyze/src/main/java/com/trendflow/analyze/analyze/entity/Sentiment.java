package com.trendflow.analyze.analyze.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "sentiment")
public class Sentiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentiment_id")
    private Long sentimentId;
    @Column(name = "source_id")
    private Long sourceId;
    @Column(name = "score")
    private Double score;
    @Column(name = "reg_dt")
    private LocalDate regDt;
}
