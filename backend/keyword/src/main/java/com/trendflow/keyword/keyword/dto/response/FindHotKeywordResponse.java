package com.trendflow.keyword.keyword.dto.response;

import com.trendflow.keyword.global.redis.HotKeyword;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FindHotKeywordResponse {
    private List<HotKeyword> day;
    private List<HotKeyword> week;
}
