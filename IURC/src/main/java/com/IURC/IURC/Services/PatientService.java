package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Patient;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public Patient findById(Long id) {
        return patientRepository.findById(id).get();
    }

    public Optional<Patient> getPatient(String username) {

        return patientRepository.findByNom(username);
    }
    // get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {

        return patientRepository.save(patient);
    }

    public void deletePatient(long id) {

        patientRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Ptainet", "Id", id));
        patientRepository.deleteById(id);

    }

}
