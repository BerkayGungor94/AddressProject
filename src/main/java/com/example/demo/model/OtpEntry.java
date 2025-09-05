package com.example.demo.model;

public record OtpEntry(String code, long expireAt) {
    public boolean isExpired() {
        return System.currentTimeMillis() > expireAt;
    }
}
