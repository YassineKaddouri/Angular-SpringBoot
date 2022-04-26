package com.IURC.IURC.DTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "reservationDtoBuilder")
public class ReservationDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("dateDebut")
    private Date dateDebut;

    @JsonProperty("dateFin")
    private Date dateFin;

    @JsonProperty("patient")
    private PatientDto patient;

    @JsonProperty("uf")
    private UfDto uf;

//    @JsonProperty("filiere")
//    private FiliereDto filiere;

//    @JsonProperty("site")
//    private SiteDto site;



}
