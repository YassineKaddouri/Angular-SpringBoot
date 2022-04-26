package com.IURC.IURC.DTOs;
import com.IURC.IURC.Entities.*;
import fr.xebia.extras.selma.IgnoreMissing;
import fr.xebia.extras.selma.Mapper;

@Mapper(withIgnoreMissing = IgnoreMissing.ALL)
public interface Mappers {
    //TODO: implementer les methodes de l'interface
    UserDto userToUserDTO(User user);
    User dtoToUser(UserDto userDto);

    RoleDto roleToRoleDTO(Role role);
    Role roleDtoToRole(RoleDto roleDto);

    ReservationDto reservationToReservationDto(Reservation reservation);
    Reservation reservationDtoToReservation(ReservationDto reservationDto);

    UfDto ufToUfDto(UF uf);
    UF ufDtoToUf(UfDto ufDto);

    FiliereDto filiereToFiliereDto(Filiere filiere);
    Filiere filiereDtoToFiliere(FiliereDto filiereDto);

    SiteDto siteToSiteDto(Site site);
    Site siteDtoToSite(SiteDto siteDto);

    PatientDto patientTOPatienDto(Patient patient);
    Patient patientDtoToPatient(PatientDto patientDto);


}
