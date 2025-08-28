package com.example.demo.repository;

import com.example.demo.entity.ArticlesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticlesEntityRepository extends JpaRepository<ArticlesEntity, Long> {
}
