package com.IURC.IURC.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RoleDto {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("name")
    private String name;

}
