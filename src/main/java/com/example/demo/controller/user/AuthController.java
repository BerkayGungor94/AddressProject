package com.example.demo.controller.user;

import com.example.demo.config.JwtUtil;
import com.example.demo.entity.user.UserEntity;
import com.example.demo.model.OtpEntry;
import com.example.demo.repository.user.UserRepository;
import com.example.demo.service.mail.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://13.61.35.238"})
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final EmailVerificationService emailVerificationService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // email -> otp entry
    private final Map<String, OtpEntry> verificationCodes = new ConcurrentHashMap<>();

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserEntity.Role.ROLE_USER);
        userRepository.save(user);
        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            if (!auth.isAuthenticated()) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid login");
            }

            UserEntity dbUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

            if (dbUser.getRole().equals("ROLE_ADMIN")) {
                String access = jwtUtil.generateAccessToken(dbUser.getUsername());
                return Map.of(
                        "twoFactorRequired", false,
                        "token", access,
                        "message", "Login successful (admin, no 2FA)"
                );
            }

            if (Boolean.TRUE.equals(dbUser.getIs2faRequired())) {
                String tempToken = jwtUtil.generateTempToken(dbUser.getEmail());
                return Map.of(
                        "twoFactorRequired", true,
                        "tempToken", tempToken,
                        "message", "2FA required"
                );
            }

            // Admin değil ve 2FA gerekmiyorsa
            String access = jwtUtil.generateAccessToken(dbUser.getUsername());
            return Map.of(
                    "twoFactorRequired", false,
                    "token", access,
                    "message", "Login successful"
            );

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(@RequestBody Map<String, String> req) {
        String tempToken = req.get("tempToken");
        if (tempToken == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "tempToken is required");

        String email = jwtUtil.extractUsername(tempToken);

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String code = emailVerificationService.sendVerificationCode(email); // e-mail at
        long expireAt = System.currentTimeMillis() + (5 * 60 * 1000);
        verificationCodes.put(email, new OtpEntry(code, expireAt));

        return Map.of("message", "OTP sent", "email", email);
    }

    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> req) {
        String tempToken = req.get("tempToken");
        String enteredCode = req.get("code");

        if (tempToken == null || enteredCode == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "tempToken and code are required");
        }

        String email;
        try {
            email = jwtUtil.extractUsername(tempToken);
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid temp token");
        }

        OtpEntry entry = verificationCodes.get(email);
        if (entry == null || entry.isExpired()) {
            verificationCodes.remove(email);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP invalid or expired");
        }

        if (!entry.code().equals(enteredCode)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        verificationCodes.remove(email);

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        return Map.of("token", accessToken, "message", "OTP verified, login successful");
    }
}
