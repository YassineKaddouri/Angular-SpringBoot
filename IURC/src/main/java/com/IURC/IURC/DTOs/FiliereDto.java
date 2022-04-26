package com.IURC.IURC.DTOs;

import com.IURC.IURC.Entities.UF;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "filiereDtoBuilder")
public class FiliereDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    private Collection<UfDto> ufs = new ArrayList<>();
}
