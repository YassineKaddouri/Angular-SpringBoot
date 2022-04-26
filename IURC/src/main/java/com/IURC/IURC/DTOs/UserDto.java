package com.IURC.IURC.DTOs;

import com.IURC.IURC.Entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;

@Data

public class UserDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @NotNull
    @JsonProperty("username")
    private String username;

    @NotNull
    @JsonProperty("password")
    private String password;

    @JsonProperty("image")
    private String image;

    @JsonProperty("roles")
    private Collection<Role> roles = new ArrayList<>();

}
