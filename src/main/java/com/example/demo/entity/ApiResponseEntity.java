package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "api_responses")
@Data
public class ApiResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private int code;
    private String locale;
    private String seed;
    private int total;

    @OneToMany(mappedBy = "api_response", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AddressesEntity> data;

}
