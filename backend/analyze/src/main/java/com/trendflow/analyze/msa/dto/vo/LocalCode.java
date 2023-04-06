package com.trendflow.analyze.msa.dto.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocalCode {
    private String code;
    private String name;
    private String groupCode;
    private String groupName;
}
