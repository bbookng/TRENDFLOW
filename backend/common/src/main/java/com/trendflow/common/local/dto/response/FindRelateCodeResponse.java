package com.trendflow.common.local.dto.response;

import com.trendflow.common.local.entity.RelateCode;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindRelateCodeResponse {
    private String code;
    private String platformCode;

    public static FindRelateCodeResponse of(RelateCode relateCode){
        return FindRelateCodeResponse.builder()
                .code(relateCode.getCode())
                .platformCode(relateCode.getPlatformCode())
                .build();
    }

    public static List<FindRelateCodeResponse> toList(List<RelateCode> relateCode){
        return relateCode.stream()
                .map(FindRelateCodeResponse::of)
                .collect(Collectors.toList());
    }
}
