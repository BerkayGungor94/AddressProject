package com.example.demo.service.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailVerificationService {
    @Autowired
    private EmailService emailService;

    public String generateVerificationCode() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    public void sendVerificationCode(String email) {
        String code = generateVerificationCode();
        emailService.sendEmail(email, "Your Verification Code", "Your verification code is: " + code);
    }

    public boolean verifyCode(String userEmail, String enteredCode, String sentCode) {
        return sentCode.equals(enteredCode);
    }
}
