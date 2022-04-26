package com.IURC.IURC.Entities;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Filiere {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable( name = "Filiere_Uf",
            joinColumns = @JoinColumn( name = "idFiliere" ),
            inverseJoinColumns = @JoinColumn( name = "idUf" ) )
    private Collection<UF> ufs = new ArrayList<>();

    @ManyToMany(mappedBy = "filiers",cascade = CascadeType.REMOVE)
    private Collection<Site> site = new ArrayList<>();

//    @OneToOne(mappedBy = "filiere"/*, cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY, optional = false*/)
//    private Reservation reservation;
}