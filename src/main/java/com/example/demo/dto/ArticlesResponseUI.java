package com.example.demo.dto;

import java.util.List;

public record ArticlesResponseUI<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages
) {}
