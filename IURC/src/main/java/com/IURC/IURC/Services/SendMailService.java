package com.IURC.IURC.Services;

import com.IURC.IURC.Entities.Mail;
import com.IURC.IURC.Repositories.MailRepository;

import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

@Service
@Transactional
public class SendMailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private MailRepository mailRepository;

    public long sendMail(Mail mail) throws MailException{
       // SimpleMailMessage message = new SimpleMailMessage();
        SimpleMailMessage message =new SimpleMailMessage();
        message.setTo("openspring0@gmail.com");
        message.setFrom("yassinekaddouri124@gmail.com");
        message.setSubject(mail.getObject());
        message.setText(mail.getMessage());
        javaMailSender.send(message);
        return mailRepository.save(mail).getId();
    }
    public void sendMailWithAttachment(Mail mail) throws MessagingException, javax.mail.MessagingException {
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(mail.getDestinataire());
        helper.setSubject(mail.getObject());
        helper.setText(mail.getMessage(),true);
        helper.addAttachment("logo.jpg",new ClassPathResource("logo.jpg"));
        javaMailSender.send(msg);


    }
}