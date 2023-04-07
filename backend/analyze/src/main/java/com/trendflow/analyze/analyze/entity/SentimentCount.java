package com.trendflow.analyze.analyze.entity;

import java.time.LocalDate;

public interface SentimentCount {
    Long getScore();
    Long getCount();
    LocalDate getRegDt();
}
