package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "api_responses")
public class ApiResponseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private int code;
    private String locale;
    private String seed;
    private int total;

    @OneToMany(mappedBy = "apiResponse", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AddressesEntity> data;

}
