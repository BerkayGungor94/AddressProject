package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class ArticlesResponse {
    private String status;
    private Integer totalResults;

    @JsonProperty("articles")
    private List<ArticlesDTO> data;
}
