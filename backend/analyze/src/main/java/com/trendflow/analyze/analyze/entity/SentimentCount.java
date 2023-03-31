package com.trendflow.analyze.analyze.entity;

import java.time.LocalDate;

public interface SentimentCount {
    Double getScore();
    Long getCount();
    LocalDate getRegDt();
}
