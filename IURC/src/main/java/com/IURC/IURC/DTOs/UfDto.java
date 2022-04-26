package com.IURC.IURC.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "ufDtoBuilder")
public class UfDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("filiere")
    private FiliereDto filiere;

    //@JsonProperty("reservation")
    //private ReservationDto reservation;

}
