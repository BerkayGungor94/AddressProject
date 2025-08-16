package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "articles_data")
@Getter
@Setter
public class ArticlesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sourceId;
    private String sourceName;
    private String author;
    private String title;

    @Column(length = 2000)
    private String description;

    private String url;
    private String urlToImage;
    private LocalDateTime publishedAt;

    @Column(columnDefinition = "TEXT")
    private String content;
}
