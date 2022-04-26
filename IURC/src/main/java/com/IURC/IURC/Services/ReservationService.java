package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static javax.transaction.Transactional.TxType.REQUIRES_NEW;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    public Reservation saveReservation(Reservation reservation) {
        log.info("Enregistrer la Reservation");
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservations() {

        return reservationRepository.findAll();
    }

    public Optional<Reservation> getByPatient(Long idPatient) {
        return reservationRepository.getByPatient(idPatient);
    }

    public Optional<Reservation> getReservationCretaria(Date dateDebut, Date dateFin, Long idUf) {
        return reservationRepository.findByDateDebutAndDateFinAndUf(dateDebut, dateFin, idUf);
    }
    @Transactional
    public Reservation update(Long id, Reservation reservationRequest){
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        reservation.setDateDebut(reservationRequest.getDateDebut());
        reservation.setDateFin(reservationRequest.getDateFin());
        reservation.setPatient(reservationRequest.getPatient());
        reservation.setUf(reservationRequest.getUf());
        return reservationRepository.save(reservation);
    }

     @Transactional
    public void delete(Long id) {
        try {
            reservationRepository.delete(reservationRepository.findById(id).get());
        } catch (Exception e) {
            System.out.println("ERROR : delete(" + id + ")  : " + e.getMessage());
        }
    }
}
