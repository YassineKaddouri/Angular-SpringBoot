package com.IURC.IURC.Entities;


import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
   @Id
   @GeneratedValue(strategy = AUTO)
   private Long id;
   private String nom;
   private String prenom;
   private Date dateNessance;
   private String adresse;
   private String telephone;

   @OneToMany(mappedBy = "patient", cascade = CascadeType.REMOVE)
   private Collection<Reservation> reservation = new ArrayList<>();

}
