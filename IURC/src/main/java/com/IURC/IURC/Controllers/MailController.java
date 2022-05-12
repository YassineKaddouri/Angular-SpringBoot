package com.IURC.IURC.Controllers;

import com.IURC.IURC.DTOs.PatientDto;
import com.IURC.IURC.Entities.Mail;
import com.IURC.IURC.Entities.Patient;
import com.IURC.IURC.Repositories.MailRepository;
import com.IURC.IURC.Services.SendMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("api")
public class MailController {
    @Autowired
    private SendMailService service;
    private  MailRepository mailRepository;

    @PostMapping("/mails")
    public long save(@RequestBody Mail mail) {
        System.out.println("send mail");
        return service.sendMail(mail);
    }
    @GetMapping("/get")
    public List<Mail> getAllMails(){
        return service.getAllMails();
    }


}