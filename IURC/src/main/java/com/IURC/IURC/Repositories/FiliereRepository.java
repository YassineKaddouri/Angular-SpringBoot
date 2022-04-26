package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    Filiere getById(Long idFiliere);
    Optional<Filiere> findById(Long id);
    Filiere findByName (String name);
}
