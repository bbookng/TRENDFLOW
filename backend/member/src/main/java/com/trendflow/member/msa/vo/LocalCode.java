package com.trendflow.member.msa.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LocalCode {
    private String code;
    private String name;
    private String groupCode;
    private String groupName;
}
