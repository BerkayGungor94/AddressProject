package com.example.demo.controller.user;

import com.example.demo.config.JwtUtil;
import com.example.demo.entity.user.UserEntity;
import com.example.demo.repository.user.UserRepository;
import com.example.demo.service.mail.EmailVerificationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final EmailVerificationService emailVerificationService;
    private final Map<String, String> verificationCodes = new HashMap<>();
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          EmailVerificationService emailVerificationService,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.emailVerificationService = emailVerificationService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Map<String, String> response = new HashMap<>();
        if (user.getIs2faRequired()) {
            String code = emailVerificationService.sendVerificationCode(email);
            System.out.println("Generated OTP for " + email + ": " + code);
            verificationCodes.put(email, code);
            System.out.println("Current map: " + verificationCodes);
            response.put("message", "OTP sent to " + email);
        } else {
            response.put("message", "Login successful (2FA not required).");
        }
        return response;
    }


    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        String correctCode = verificationCodes.get(email);
        if (correctCode != null && correctCode.equals(code)) {
            verificationCodes.remove(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", "OTP verified successfully");
            return response;
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserEntity user) {
        try {
//            String encoded = new BCryptPasswordEncoder().encode("admin");
//            System.out.println(encoded);

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            if (auth.isAuthenticated()) {
                String token = jwtUtil.generateToken(user.getUsername());
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                return response;
            } else {
                throw new RuntimeException("Invalid login");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }
}
