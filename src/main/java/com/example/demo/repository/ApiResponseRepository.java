package com.example.demo.repository;

import com.example.demo.entity.ApiResponseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApiResponseRepository extends JpaRepository<ApiResponseEntity, Long> {
}
