package com.IURC.IURC.Entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;


import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Reservation {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    private Date dateDebut;

    private Date dateFin;

    @ManyToOne/*(cascade = CascadeType.MERGE)*/
    @JoinColumn(name = "idPatient")
    private Patient patient;

    @ManyToOne/*(cascade = {CascadeType.MERGE})*/
    @JoinColumn(name = "idUf")
    private UF uf;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn( name="idFiliere" )
//    private Filiere filiere;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn( name="idSite" )
//    private Site site;

}
