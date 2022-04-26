package com.IURC.IURC.Services.MappingServices;

import com.IURC.IURC.DTOs.*;
import com.IURC.IURC.Entities.*;

import java.util.Collection;
import java.util.List;

public interface MappingService {
    ReservationDto mapReservationDFromReservation(Reservation reservation);
    UfDto mapUfDFromByUf(UF uf);
    UfDto mapUfDFromByUfWithoutFiliere(UF uf);
    FiliereDto mapFiliereDtoFromFiliere(Filiere filiere);
    List<UfDto> mapFiliereDtoFromFiliere(Collection<UF> ufs);
    PatientDto mapPatientDFromByPatient(Patient patient);
    SiteDto mapSiteDFromBySite(Site site);
}
