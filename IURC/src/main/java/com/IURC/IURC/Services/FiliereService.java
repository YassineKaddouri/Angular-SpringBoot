package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Filiere;
import com.IURC.IURC.Entities.Site;
import com.IURC.IURC.Entities.UF;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.FiliereRepository;
import com.IURC.IURC.Repositories.UfRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FiliereService {
    @Autowired
    private FiliereRepository filiereRepository;
    @Autowired
    private UfRepository ufRepository;

    public Filiere saveFiliere(Filiere filiere){
        log.info("Ajouter Filière");
        return filiereRepository.save(filiere);
    }

    public List<Filiere> getFilieres(){

        return filiereRepository.findAll();
    }

    public Filiere getFiliereById(Long id){

        return filiereRepository.findById(id).get();
    }
    // UPDATE
    public Filiere updateFiliere(Long id, Filiere filiereDetails){
        Filiere filiere= filiereRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        filiere.setName(filiereDetails.getName());

        return filiereRepository.save(filiere);
    }
    //DELETE
    public void deleteFiliere(Long id) {
        try {
            filiereRepository.delete(filiereRepository.findById(id).get());
        } catch (Exception e) {
            System.out.println("ERROR : deleteFiliere(" + id + ")  : " + e.getMessage());
        }
    }


//
//   public void addToFiliere(Long idFiliere , Long idUf) {
//        UF uf = ufRepository.getById(idUf);
//        Filiere filiere = filiereRepository.getById(idFiliere);
//        filiere.getUfs().add(uf);
//
//    }

}
