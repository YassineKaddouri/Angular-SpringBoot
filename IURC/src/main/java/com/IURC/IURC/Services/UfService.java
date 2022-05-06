package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Filiere;
import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.UfRepository;
import com.IURC.IURC.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static javax.transaction.Transactional.TxType.REQUIRES_NEW;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UfService {
    @Autowired
    private UfRepository ufRepository;

    public UF saveUf(UF uf) {
        log.info("Enregistrer la filiere");
        return ufRepository.save(uf);
    }

    public Optional<UF> getUf(Long id) {

        return ufRepository.findById(id);
    }

    public List<UF> getUfs() {

        return ufRepository.findAll();
    }

    public UF getUf(String name) {
        return ufRepository.findByName(name);
    }

    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Long id) {
        try {
            ufRepository.delete(ufRepository.findById(id).get());
        } catch (Exception e) {
            System.out.println("ERROR : delete(" + id + ")  : " + e.getMessage());
        }
    }

    @Transactional
    public UF update(Long id, UF ufRequest) {
        UF uf = ufRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        uf.setName(ufRequest.getName());
        uf.setFiliere(ufRequest.getFiliere());
        return ufRepository.save(uf);
    }

    public List<Reservation> getUfReservation(Date date) {
        return ufRepository.getUfReservation(date);
    }

    public List<UF> getUfDisponible(Date date) {
        return ufRepository.getUfDisponible(date);
    }
    public List<Reservation> getStatus(Date dateDebut, Date dateFin) {
        return ufRepository.getStatus(dateDebut, dateFin);
    }

    public List<UF> getUfFilier(long idFilier) {
        return ufRepository.getUfFiliere(idFilier);
    }

    public int countUfReservation(long id, Date dateD) {
        return ufRepository.countUfReservation(id, dateD);
    }

    public int countPatientReservation(long id, Date dateD) {
        return ufRepository.countPatientReservation(id, dateD);
    }
}
