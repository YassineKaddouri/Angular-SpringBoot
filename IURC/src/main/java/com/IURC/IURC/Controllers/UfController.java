package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.FiliereDto;
import com.IURC.IURC.DTOs.Mappers;
import com.IURC.IURC.DTOs.ReservationDto;
import com.IURC.IURC.DTOs.UfDto;
import com.IURC.IURC.Entities.Filiere;
import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Services.MappingServices.MappingService;
import com.IURC.IURC.Services.UfService;
import fr.xebia.extras.selma.Selma;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/iurc/uf")
@RequiredArgsConstructor
public class UfController {
    @Autowired
    private UfService ufService;
    @Autowired(required = false)
    private Mappers selmaMapper = Selma.mapper(Mappers.class);
    @Autowired
    private MappingService mappingService;

    @GetMapping("/{id}")
    public ResponseEntity<UfDto> findById(@PathVariable("id") Long id) {

        try {
            Optional<UF> uf = ufService.getUf(id);
            return ResponseEntity.ok().body(mappingService.mapUfDFromByUf(uf.get()));
        } catch (Exception e) {
            System.out.println("[ERROE]   :    " + e.getMessage());
        }
        return null;
    }

    @GetMapping
    public List<UfDto> getUfs() {
        List<UF> all = ufService.getUfs();
        List<UfDto> allDTO = all.stream().map(
                (i) -> {
                    return mappingService.mapUfDFromByUfWithoutFiliere(i);
                }
        ).collect(Collectors.toList());
        return allDTO;

    }

    @Transactional
    @PostMapping("/save")
    public ResponseEntity<UfDto> saveUF(@RequestBody UfDto ufDto) {
        UF UF = selmaMapper.ufDtoToUf(ufDto);
        UF UFCreated = ufService.saveUf(UF);
        return ResponseEntity.ok().body(selmaMapper.ufToUfDto(UFCreated));
    }

    @Transactional
    @PutMapping(value = "update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UF> updatePost(@PathVariable(value = "id") Long Id, @RequestBody UfDto ufDto) {
        UF uf = selmaMapper.ufDtoToUf(ufDto);
        return ResponseEntity.ok().body(ufService.update(Id, uf));
    }

    @DeleteMapping("delete/{id}")
    public void remove(@PathVariable("id") Long id) {

        ufService.delete(id);
    }

    //    private UfDto mapUfDFromByUf(UF uf) {
//
//        return new UfDto().ufDtoBuilder()
//                .name(uf.getName())
//                .id(uf.getId())
//                .filiere(mapFiliereDtoFromFiliere(uf.getFiliere()))
//                .build();
//    }
//
//    private UfDto mapUfDFromByUfWithoutFiliere(UF uf) {
//
//        return new UfDto().ufDtoBuilder()
//                .name(uf.getName())
//                .id(uf.getId())
//                .build();
//    }
//
//    private FiliereDto mapFiliereDtoFromFiliere(Filiere filiere) {
//        return new FiliereDto().filiereDtoBuilder()
//                .name(filiere.getName())
//                .id(filiere.getId())
//                .ufs(mapFiliereDtoFromFiliere(filiere.getUfs()))
//                .build();
//    }
//
//    private List<UfDto> mapFiliereDtoFromFiliere(Collection<UF> ufs) {
//        List<UfDto> ufsDto = new ArrayList<>();
//        ufs.forEach(u -> ufsDto.add(mapUfDFromByUfWithoutFiliere(u)));
//        return ufsDto;
//    }
    @GetMapping("/detail")
    public List<ReservationDto> ufDetails(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        List<Reservation> ufs = ufService.getUfReservation(date);
        List<ReservationDto> allDTO = ufs.stream().map(
                (i) -> {
                    return mappingService.mapReservationDFromReservation(i);
                }
        ).collect(Collectors.toList());
        return allDTO;
    }

    @GetMapping("/dispo")
    public List<UfDto> ufDesponible(@RequestParam(required = false, value = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern = "yyyy-MM-dd") Date date) {
        List<UF> ufs = ufService.getUfDisponible(date);
        List<UfDto> allDTO = ufs.stream().map(
                (i) -> {
                    return mappingService.mapUfDFromByUfWithoutFiliere(i);
                }
        ).collect(Collectors.toList());
        return allDTO;
    }
    @GetMapping("/uf_filier/{idFilier}")
    public List<UfDto> ufFiliere(@PathVariable long idFilier){
        List<UF> ufs =  ufService.getUfFilier(idFilier);
        List<UfDto> allDTO = ufs.stream().map(
                (i) -> {
                    return mappingService.mapUfDFromByUfWithoutFiliere(i);
                }
        ).collect(Collectors.toList());
        return allDTO;
    }
}

@Data
class Critiers {
    private Date date;
}


