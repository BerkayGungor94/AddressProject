// com.example.demo.dto.response.AddressesDTO.java
package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressesDTO {
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
