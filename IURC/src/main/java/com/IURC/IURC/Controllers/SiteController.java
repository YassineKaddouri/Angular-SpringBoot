package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.SiteDto;
import com.IURC.IURC.Entities.Site;
import com.IURC.IURC.Services.MappingServices.MappingService;
import com.IURC.IURC.Services.SiteService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("iurc")
public class SiteController {

    @Autowired
    private SiteService siteService;
    @Autowired
    private MappingService mappingService;

    @PostMapping("site/save")
    public void addSite(@RequestBody Site site){
        siteService.saveSite(site);
    }

    @PostMapping("filiere/addToSite")
    public ResponseEntity<?> addFiliereToSite (@RequestBody FiliereToSiteForm form){
        siteService.addFiliereToSite(form.getSiteName(), form.getFiliereName());
        return ResponseEntity.ok().build();

    }
    @GetMapping("sites")
    public List<SiteDto> getSites(){
        List<Site> all = siteService.getSites();
        List<SiteDto> allDTO = all.stream().map(
                (i) -> {
                    return mappingService.mapSiteDFromBySite(i);
                }
        ).collect(Collectors.toList());
        return allDTO;

    }

//    @GetMapping("site/{id}")
//    public ResponseEntity<Site> getBySiteId(@PathVariable Long id) {
//        try {
//            Site site = siteService.getBySiteId(id);
//            return new ResponseEntity<Site>(site, HttpStatus.OK);
//        } catch (NoSuchElementException e) {
//            return new ResponseEntity<Site>(HttpStatus.NOT_FOUND);
//        }
//    }
@GetMapping("site/{id}")
public SiteDto getBySiteId(@PathVariable Long id) {

        Site site = siteService.getBySiteId(id);
        return mappingService.mapSiteDFromBySite(site);
}
    //update
    @PutMapping(value = "update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Site> updateSite(@PathVariable(value = "id") Long id, @RequestBody Site site) {
        return ResponseEntity.ok(siteService.updateSite(id,site));

    }
    //DELETE

    @DeleteMapping("delete/{id}")
    public void deleteSite(@PathVariable Long id) {

        siteService.deleteSite(id);
    }

  /*  @GetMapping("AllSites/filiers")
    public List<SiteDto> getAllSitesFiliere(){
        return siteService.getAllSitesFiliere();
    }*/
}

@Data
class FiliereToSiteForm{
    private String siteName;
    private String filiereName;

}
