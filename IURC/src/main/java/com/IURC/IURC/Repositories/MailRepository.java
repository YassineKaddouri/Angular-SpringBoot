package com.IURC.IURC.Repositories;


import com.IURC.IURC.Entities.Mail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailRepository extends JpaRepository<Mail, Long> {
}