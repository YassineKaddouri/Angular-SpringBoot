package com.IURC.IURC.Controllers;

import com.IURC.IURC.Entities.Mail;
import com.IURC.IURC.Services.SendMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api")
public class MailController {
    @Autowired
    private SendMailService service;


    @PostMapping("/mails")
    public long save(@RequestBody Mail mail) {
        System.out.println("send mail");
        return service.sendMail(mail);
    }
}