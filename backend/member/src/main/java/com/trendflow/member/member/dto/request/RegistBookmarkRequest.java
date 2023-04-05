package com.trendflow.member.member.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegistBookmarkRequest {
    private String keyword;
}
