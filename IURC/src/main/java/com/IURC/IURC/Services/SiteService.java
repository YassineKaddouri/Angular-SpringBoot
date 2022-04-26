package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Filiere;
import com.IURC.IURC.Entities.Site;
import com.IURC.IURC.Exceptions.ResourceNotFoundException;
import com.IURC.IURC.Repositories.FiliereRepository;
import com.IURC.IURC.Repositories.SiteRepository;
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
public class SiteService {
    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private FiliereRepository filiereRepository;

    public Site saveSite(Site site){
        log.info("Enregistrer Site");
        return siteRepository.save(site);
    }
    public void addFiliereToSite(String name, String filiereName) {
        Site site = siteRepository.findByName(name);
        Filiere filiere = filiereRepository.findByName(filiereName);

        site.getFiliers().add(filiere);

    }
    public List<Site> getSites() {
        return siteRepository.findAll();
    }

    public Site getBySiteId(Long id) {

        return siteRepository.findById(id).get();
    }

    public Site updateSite(Long id, Site siteDetails){
        Site site= siteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        site.setName(siteDetails.getName());
        site.setAddress(siteDetails.getAddress());

        return siteRepository.save(site);
    }

    public void deleteSite(Long id) {

        siteRepository.deleteById(id);
    }


}
