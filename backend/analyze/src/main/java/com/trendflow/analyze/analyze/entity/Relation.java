package com.trendflow.analyze.analyze.entity;

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
@Table(name = "relation")
public class Relation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "relation_id")
    private Long relationId;
    @Column(name = "keyword_id")
    private Long keywordId;
    @Column(name = "keyword")
    private String keyword;
    @Column(name = "relation_keyword_id")
    private Long relationKeywordId;
    @Column(name = "relation_keyword")
    private String relationKeyword;
    @Column(name = "count")
    private Long count;
    @Column(name = "reg_dt")
    private LocalDateTime regDt;
}
