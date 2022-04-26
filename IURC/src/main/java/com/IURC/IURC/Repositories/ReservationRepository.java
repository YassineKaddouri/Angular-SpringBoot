package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("select r from Reservation  r where r.patient.id=?1")
    Optional<Reservation> getByPatient(Long idPatient);
    Optional<Reservation> findByDateDebutAndDateFinAndUf(Date dateDebut, Date dateFin, Long id);

}
