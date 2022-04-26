package com.IURC.IURC.DTOs;

import com.IURC.IURC.Entities.Filiere;
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
@Builder(builderMethodName = "siteDtoBuilder")

public class SiteDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;
    @JsonProperty("address")
    private String address;
    private Collection<FiliereDto> filiers = new ArrayList<>();
}
