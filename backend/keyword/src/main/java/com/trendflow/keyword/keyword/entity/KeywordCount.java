package com.trendflow.keyword.keyword.entity;

import java.time.LocalDate;

public interface KeywordCount {
    String getPlatformCode();
    Long getCount();
    LocalDate getRegDt();
}
