package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnimalsDTO {
    private Long id;
    private String name;
    private String bred_for;
    private String breed_group;
    private String life_span;
    private String temperament;
    private String origin;
    private String reference_image_id;
    private ImageDTO image;
    private WeightDTO weight;
    private HeightDTO height;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ImageDTO {
        private String id;
        private Integer width;
        private Integer height;
        private String url;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class WeightDTO {
        private String imperial;
        private String metric;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HeightDTO {
        private String imperial;
        private String metric;
    }
}
