package com.IURC.IURC.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor


public class Secretaire extends User{
    private String prenom;
    private String CIN;
    private Date dateNessance;
    private String adresse;
    private String telephone;

}
