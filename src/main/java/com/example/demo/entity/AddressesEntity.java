package com.example.demo.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "addresses_data")
@Getter
@Setter
public class AddressesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String street;
    private String streetName;
    private String buildingNumber;
    private String city;
    private String zipcode;
    private String country;
    @JsonProperty("country_code")
    private String countryCode;
    private Double latitude;
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "api_response_id")
    private ApiResponseEntity apiResponse;
}
