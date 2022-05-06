package com.IURC.IURC.Services.MappingServices;

import com.IURC.IURC.DTOs.*;
import com.IURC.IURC.Entities.*;
import fr.xebia.extras.selma.Selma;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MappingServiceImp implements MappingService {
    @Autowired(required = false)
    private Mappers selmaMapper = Selma.mapper(Mappers.class);
    @Override
    public ReservationDto mapReservationDFromReservation(Reservation reservation) {
       return new ReservationDto().reservationDtoBuilder()
               .id(reservation.getId())
               .dateDebut(reservation.getDateDebut())
               .dateFin(reservation.getDateFin())
               .patient(mapPatientDFromByPatient(reservation.getPatient()))
               //.uf(mapUfDFromByUf(reservation.getUf()))
               .uf(mapUfDFromByUfWithoutFiliere(reservation.getUf()))
               .build();
    }

    @Override
    public UfDto mapUfDFromByUf(UF uf) {

        return new UfDto().ufDtoBuilder()
                .name(uf.getName())
                .id(uf.getId())
                .filiere(mapFiliereDtoFromFiliere(uf.getFiliere()))
                .build();
    }

    @Override
    public UfDto mapUfDFromByUfWithoutFiliere(UF uf) {

        return new UfDto().ufDtoBuilder()
                .name(uf.getName())
                .id(uf.getId())
                .build();
    }

    @Override
    public FiliereDto mapFiliereDtoFromFiliere(Filiere filiere) {
        return new FiliereDto().filiereDtoBuilder()
                .name(filiere.getName())
                .id(filiere.getId())
                .ufs(mapFiliereDtoFromFiliere(filiere.getUfs()))
                .build();
    }

    @Override
    public List<UfDto> mapFiliereDtoFromFiliere(Collection<UF> ufs) {
        List<UfDto> ufsDto = new ArrayList<>();
        ufs.forEach(u -> ufsDto.add(mapUfDFromByUfWithoutFiliere(u)));
        return ufsDto;
    }

    @Override
    public PatientDto mapPatientDFromByPatient(Patient patient) {
        return new PatientDto().patientDtoBuilder()
                .id(patient.getId())
                .nom(patient.getNom())
                .prenom(patient.getPrenom())
                .dateNessance(patient.getDateNessance())
                .telephone(patient.getTelephone())
                .adresse(patient.getAdresse())
                .build();
    }

    @Override
    public SiteDto mapSiteDFromBySite(Site site) {
        Collection<FiliereDto> filiereDtos = new ArrayList<>();
        site.getFiliers().forEach(f -> filiereDtos.add(mapFiliereDtoFromFiliere(f)));
        return new SiteDto().siteDtoBuilder()
                .name(site.getName())
                .id(site.getId())
                .address(site.getAddress())
                .filiers(filiereDtos)
                .build();
    }
}
