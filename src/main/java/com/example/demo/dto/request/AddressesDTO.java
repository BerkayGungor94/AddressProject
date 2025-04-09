package com.example.demo.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.lang.reflect.Array;

@Data
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class AddressesDTO {
    private Array Data;

    public static class Data {
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
    }
}
