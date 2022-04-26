package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface UfRepository extends JpaRepository<UF, Long> {
      //UF getById(Long idUf);
      UF findByName(String name);
      @Query("select r from Reservation r join UF uf on r.uf.id = uf.id where r.dateDebut >= ?1 or (r.dateDebut<= ?1 and r.dateFin>= ?1) or (r.dateDebut<= ?1 and r.dateFin is null ) ")
      List<Reservation> getUfReservation(Date date);
      //      @Query("select uf from UF uf join Reservation r on uf.id = r.uf.id where r.dateFin<= ?1 or uf.id not in" +
//              "(SELECT uf.id from Reservation ) ")
      //uf FROM UF as uf , Reservation as r WHERE uf.id NOT IN (SELECT r.uf.id from Reservation r) or uf.id = r.uf.id and r.dateFin <?1
//SELECT uf FROM UF as uf WHERE uf.id NOT IN (SELECT r.uf.id from Reservation r ) or uf.id in (SELECT uf.id from Reservation r where r.dateFin <'2022-03-30')
      @Query("SELECT   distinct  uf FROM UF as uf, Reservation r WHERE\n" +
              "(uf.id = r.uf.id and r.dateFin<?1) or uf.id NOT IN (SELECT distinct r.uf.id from Reservation r ) group by uf.id")
      List<UF> getUfDisponible(Date date);

      @Query("select uf from UF  uf where uf.filiere.id=?1")
      List<UF> getUfFiliere(long idFilier);
}
