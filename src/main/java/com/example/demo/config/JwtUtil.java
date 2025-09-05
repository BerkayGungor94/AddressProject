package com.example.demo.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {
    private final Key KEY = Keys.hmacShaKeyFor("super-secret-key-change-me-please-32b!".getBytes());

    public String generateAccessToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .addClaims(Map.of("type", "ACCESS"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateTempToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .addClaims(Map.of("type", "TEMP"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return parse(token).getBody().getSubject();
    }

    public String extractType(String token) {
        Object t = parse(token).getBody().get("type");
        return t == null ? null : t.toString();
    }

    public boolean isValid(String token) {
        try {
            parse(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(token);
    }
}
