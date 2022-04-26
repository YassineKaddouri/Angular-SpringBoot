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
//@Builder
//@Getter
//@Setter
public class UF {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToOne
    @JoinTable(name = "Filiere_Uf",
            joinColumns = @JoinColumn(name = "idUf"),
            inverseJoinColumns = @JoinColumn(name = "idFiliere"))
    private Filiere filiere;

    @OneToMany(mappedBy = "uf", cascade = CascadeType.REMOVE)
    private Collection<Reservation> reservation = new ArrayList<>();
}
