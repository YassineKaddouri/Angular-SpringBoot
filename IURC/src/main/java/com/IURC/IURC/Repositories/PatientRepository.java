package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByNom(String nom);
}
