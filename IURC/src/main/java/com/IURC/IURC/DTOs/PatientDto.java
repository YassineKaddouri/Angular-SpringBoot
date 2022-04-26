package com.IURC.IURC.DTOs;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder(builderMethodName = "patientDtoBuilder")
public class PatientDto {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("nom")
    private String nom;

    @JsonProperty("prenom")
    private String prenom;

    @JsonProperty("dateNessance")
    private Date dateNessance;

    @JsonProperty("adresse")
    private String adresse;

    @JsonProperty("telephone")
    private String telephone;
}
