//package com.example.demo.controller.mail;
//
//import com.example.demo.entity.user.UserEntity;
//import com.example.demo.repository.user.UserRepository;
//import com.example.demo.service.mail.EmailVerificationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
//@RestController
//@RequestMapping("/auth")
//public class EmailVerificationController {
//
//    @Autowired
//    private EmailVerificationService emailVerificationService;
//    UserRepository userRepository;
//
//    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();
//
//    @PostMapping("/send-otp")
//    public Map<String, String> sendOtp(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//
//        UserEntity user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Map<String, String> response = new HashMap<>();
//
//        if (user.getIs2faRequired()) {
//            String code = emailVerificationService.sendVerificationCode(email);
//            verificationCodes.put(email, code);
//
//            response.put("message", "OTP sent to " + email);
//        } else {
//            response.put("message", "Login successful (2FA not required).");
//        }
//
//        return response;
//    }
//
//
//    @PostMapping("/verify-otp")
//    public Map<String, Object> verifyOtp(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//        String enteredCode = request.get("otp");
//        String sentCode = verificationCodes.get(email);
//
//        Map<String, Object> response = new HashMap<>();
//
//        if (emailVerificationService.verifyCode(enteredCode, sentCode)) {
//            response.put("success", true);
//            response.put("message", "OTP verified successfully!");
//            verificationCodes.remove(email);
//        } else {
//            response.put("success", false);
//            response.put("message", "Invalid or expired OTP.");
//        }
//
//        return response;
//    }
//}
