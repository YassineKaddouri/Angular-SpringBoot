package com.example.demo.Controllers;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class api {

    @GetMapping("/test")
    public String test(){
        return "hello World";
    }
}
