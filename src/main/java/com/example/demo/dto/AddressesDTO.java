// com.example.demo.dto.response.AddressesDTO.java
package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

        public Long getId() {
                return id;
        }

        public String getStreet() {
                return street;
        }

        public String getStreetName() {
                return streetName;
        }

        public String getBuildingNumber() {
                return buildingNumber;
        }

        public String getCity() {
                return city;
        }

        public String getZipcode() {
                return zipcode;
        }

        public String getCountry() {
                return country;
        }

        public String getCountryCode() {
                return countryCode;
        }

        public Double getLatitude() {
                return latitude;
        }

        public Double getLongitude() {
                return longitude;
        }
}
