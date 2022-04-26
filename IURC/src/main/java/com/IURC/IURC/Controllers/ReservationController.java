package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.Mappers;
import com.IURC.IURC.DTOs.ReservationDto;
import com.IURC.IURC.DTOs.UfDto;
import com.IURC.IURC.DTOs.UserDto;
import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Entities.User;
import com.IURC.IURC.Services.MappingServices.MappingService;
import com.IURC.IURC.Services.ReservationService;
import fr.xebia.extras.selma.Selma;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
@Slf4j
public class ReservationController {
    @Autowired
    private ReservationService reservationService;
    @Autowired(required = false)
    private Mappers selmaMapper = Selma.mapper(Mappers.class);
    @Autowired
    private MappingService mappingService;

    @GetMapping("/")
//    public ResponseEntity<List<Reservation>> getReservations() {
//
//        return ResponseEntity.ok().body(reservationService.getReservations());
//    }

  public List<ReservationDto>getReservations(){

         List<Reservation> all = reservationService.getReservations();
        List<ReservationDto> allDTO = all.stream().map(
                (i) -> {
                    return mappingService.mapReservationDFromReservation(i);
                }
        ).collect(Collectors.toList());
        return allDTO;

    }

           @PostMapping("/save")
           public ResponseEntity<Reservation> saveReservation(@RequestBody Reservation reservation){
               return ResponseEntity.ok().body(reservationService.saveReservation(reservation));
           }

//    @PostMapping("/save")
//    public ResponseEntity<ReservationDto> saveReservation(@RequestBody ReservationDto reservationDto) {
//        Reservation reservation = selmaMapper.reservationDtoToReservation(reservationDto);
//        Reservation reservationCreated = reservationService.saveReservation(reservation);
//        return ResponseEntity.ok().body(selmaMapper.reservationToReservationDto(reservationCreated));
//    }

    @GetMapping("/getByPatient/{idPatient}")
    public ResponseEntity<ReservationDto> getByIdPatient(@PathVariable("idPatient") Long idPatient) {
        try {
            Optional<Reservation> reservation = reservationService.getByPatient(idPatient);
            return ResponseEntity.ok().body(mappingService.mapReservationDFromReservation(reservation.get()));
        } catch (Exception e) {
            System.out.println("[ERROE]   :    " + e.getMessage());
        }
        return null;
    }

    @PutMapping("update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Reservation> updatePost(@PathVariable(value = "id") Long Id, @RequestBody ReservationDto reservationDto) {
        Reservation reservation = selmaMapper.reservationDtoToReservation(reservationDto);
        return ResponseEntity.ok().body(reservationService.update(Id, reservation));
    }

    @DeleteMapping("delete/{id}")
    public void remove(@PathVariable("id") Long id) {
        reservationService.delete(id);
    }
}
