package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.FiliereDto;
import com.IURC.IURC.DTOs.ReservationDto;
import com.IURC.IURC.Entities.Filiere;
import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Entities.Site;
import com.IURC.IURC.Services.FiliereService;
import com.IURC.IURC.Services.MappingServices.MappingService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/iurc")
//@RequiredArgsConstructor
public class FiliereController {
    @Autowired
    private FiliereService filiereService;
    @Autowired
    private MappingService mappingService;
    @PostMapping("/filiere/save")
    public ResponseEntity<?> saveFiliere(@RequestBody Filiere filiere){
        return new ResponseEntity<>(filiereService.saveFiliere(filiere), HttpStatus.CREATED);
    }

    @GetMapping("filieres")
    public List<FiliereDto> getFilieres(){
        List<Filiere> all = filiereService.getFilieres();
        List<FiliereDto> allDTO = all.stream().map(
                (i) -> {
                    return mappingService.mapFiliereDtoFromFiliere(i);
                }
        ).collect(Collectors.toList());
        return allDTO;
    }
    @GetMapping("filiere/{id}")
    public ResponseEntity<Filiere> getFiliereById(@PathVariable Long id) {
        try {
            Filiere filiere = filiereService.getFiliereById(id);
            return new ResponseEntity<Filiere>(filiere, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Filiere>(HttpStatus.NOT_FOUND);
        }
    }
    //update
    @PutMapping(value = "/updatefiliere/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updateFiliere(@PathVariable(value = "id") Long id, @RequestBody Filiere filiere) {
        filiereService.updateFiliere(id,filiere);

    }
    //DELETE filiere if not affected to any uf

    @DeleteMapping("deletefiliere/{id}")
    public void deleteFiliere(@PathVariable Long id) {
        filiereService.deleteFiliere(id);

    }

    public void getFiliereUf(){

    }

//    @GetMapping("affictatin/{idFiliere}/{idUf}")
//    public ResponseEntity<Filiere> getFiliereById(@PathVariable Long idFiliere, @PathVariable Lo idUf) {
//        try {
//            Filiere filiere = filiereService.getFiliereById(id);
//            return new ResponseEntity<Filiere>(filiere, HttpStatus.OK);
//        } catch (NoSuchElementException e) {
//            return new ResponseEntity<Filiere>(HttpStatus.NOT_FOUND);
//        }
//    }
//    @PostMapping("filiere/addToUf")
//    public ResponseEntity<?> addFiliereToUf (@RequestBody UfToFiliereForm form){
//        filiereService.addFiliereToUf(form.getFiliereName(),form.getUfName());
//        return ResponseEntity.ok().build();
//
//    }

}



