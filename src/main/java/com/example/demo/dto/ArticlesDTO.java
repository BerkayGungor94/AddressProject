package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticlesDTO {
    @JsonProperty("source")
    private SourceDTO sourceDTO;
    private String author;
    private String title;
    private String description;
    private String url;
    private String urlToImage;
    private LocalDateTime publishedAt;
    private String content;

    @Getter
    @Setter
    public static class SourceDTO {
        private String id;
        private String name;

    }
}



