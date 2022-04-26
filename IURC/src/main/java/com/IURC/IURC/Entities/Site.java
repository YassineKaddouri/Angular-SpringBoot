package com.IURC.IURC.Entities;

import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.AUTO;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class Site {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    @Column(unique = true)
    private String name;
    private String address;
    @ManyToMany(fetch = EAGER)
    private Collection<Filiere> filiers = new ArrayList<>();

//    @OneToOne(mappedBy = "site"/*, cascade = CascadeType.ALL,
//            fetch = FetchType.LAZY, optional = false*/)
//    private Reservation reservation;
}
