package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface UfRepository extends JpaRepository<UF, Long> {
      UF findByName(String name);

      @Query("select r from Reservation r join UF uf on r.uf.id = uf.id where r.dateDebut >= ?1 or (r.dateDebut<= ?1 and r.dateFin>= ?1) or (r.dateDebut<= ?1 and r.dateFin is null ) order by  r.dateDebut ASC")
      List<Reservation> getUfReservation(Date date);

      @Query("SELECT   distinct  uf FROM UF as uf, Reservation r WHERE (uf.id = r.uf.id and r.dateFin<?1) or uf.id NOT IN (SELECT distinct r.uf.id from Reservation r ) group by uf.id")
      List<UF> getUfDisponible(Date date);

      @Query("select distinct r from Reservation r join UF uf on r.uf.id = uf.id where" +
              "((r.dateDebut >= ?1 and r.dateFin <= ?2) or " +
              "((r.dateDebut>?1 and r.dateFin>=?2) and(r.dateDebut between ?1 and ?2) ) or " +
              "((r.dateDebut<= ?1 or r.dateDebut<=?2 )and r.dateFin is null) or " +

              "(r.dateDebut<?1 and r.dateFin>=?1) or " +
              "(r.dateDebut<?1 and r.dateFin>= ?2))")
      List<Reservation> getStatus(Date dateDebut, Date dateFin);

      @Query("select uf from UF  uf where uf.filiere.id=?1")
      List<UF> getUfFiliere(long idFilier);

      @Query("SELECT count (r) FROM Reservation r WHERE r.uf.id = ?1 and ((?2 BETWEEN r.dateDebut and r.dateFin) OR (?2 >= r.dateDebut and r.dateFin is null))")
      int countUfReservation(long id, Date dateD);

      @Query("SELECT count (r) FROM Reservation r WHERE r.patient.id = ?1 and ((?2 BETWEEN r.dateDebut and r.dateFin) OR (?2 >= r.dateDebut and r.dateFin is null))")
      int countPatientReservation(long id, Date dateD);

}
