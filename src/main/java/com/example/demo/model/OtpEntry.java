package com.example.demo.model;

public record OtpEntry(String code, long expiredAt) {
    public boolean isExpired() {
        return System.currentTimeMillis() > expiredAt;
    }
}