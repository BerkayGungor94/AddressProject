package com.example.demo.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailVerificationService {
    @Autowired
    private EmailService emailService;

    public String sendVerificationCode(String email) {
        String code = String.format("%06d", new Random().nextInt(999999));
        emailService.sendEmail(
                email,
                "Your Verification Code by ROKO",
                "Your verification code is: " + code
        );
        return code;
    }
}
