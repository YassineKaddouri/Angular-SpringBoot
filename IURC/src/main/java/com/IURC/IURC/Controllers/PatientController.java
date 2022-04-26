package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.PatientDto;
import com.IURC.IURC.Entities.Patient;
import com.IURC.IURC.Entities.Reservation;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.PatientRepository;
import com.IURC.IURC.Services.MappingServices.MappingService;
import com.IURC.IURC.Services.PatientService;
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
@RequestMapping("/patient")
@RequiredArgsConstructor
@Slf4j
public class PatientController {

       @Autowired
       private PatientService patientService;
       @Autowired
       private PatientRepository patientRepository;
    @Autowired
    private MappingService mappingService;

    // all patient Rest api
    @GetMapping
    public List<PatientDto> getAllPatients(){

        List<Patient> all = patientRepository.findAll();
        List<PatientDto> allDTO = all.stream().map(
                (i) -> {
                    return mappingService.mapPatientDFromByPatient(i);
                }
        ).collect(Collectors.toList());
        return allDTO;

    }


    //build create patient REST API
    @PostMapping("/save")
    public ResponseEntity<Patient> savePatient(@RequestBody Patient patient){
        return new ResponseEntity<Patient>(patientService.savePatient(patient) , HttpStatus.CREATED);

    }


    //ById
    @GetMapping("/{id}")
    public ResponseEntity<Patient>  getPatientById(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        return ResponseEntity.ok(patient);


    }



    //Update
    @PutMapping("/patients/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable("id") Long id, @RequestBody Patient patientDetails){
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        patient.setNom(patientDetails.getNom());
        patient.setPrenom(patientDetails.getPrenom());
        patient.setDateNessance(patientDetails.getDateNessance());
        patient.setAdresse(patientDetails.getAdresse());
        patient.setTelephone(patientDetails.getTelephone());


        Patient updatePatient = patientRepository.save(patient);
        return ResponseEntity.ok(updatePatient);

    }
    // delete patient rest api
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable("id") long id){

        // delete employee from DB
        patientService.deletePatient(id);

        return new ResponseEntity<String>("Patient deleted successfully!.", HttpStatus.OK);
    }


}
