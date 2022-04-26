package com.IURC.IURC.Repositories;

import com.IURC.IURC.Entities.Patient;
import com.IURC.IURC.Entities.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {
    Site findByName(String name);
}
