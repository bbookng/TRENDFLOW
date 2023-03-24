package com.trendflow.common.local.dto.response;

import com.trendflow.common.local.entity.LocalCode;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class FindLocalCodeResponse {
    private String code;
    private String name;
    private String groupCode;
    private String groupName;

    public static FindLocalCodeResponse fromEntity(LocalCode commonCode){
        return FindLocalCodeResponse.builder()
                .code(commonCode.getCode())
                .name(commonCode.getName())
                .groupCode(commonCode.getGroupCode())
                .groupName(commonCode.getGroupName())
                .build();
    }

    public static List<FindLocalCodeResponse> toList(List<LocalCode> commonCodeList){
        return commonCodeList.stream()
                .map(FindLocalCodeResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
