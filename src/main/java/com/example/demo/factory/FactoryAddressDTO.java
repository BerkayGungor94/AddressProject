package com.example.demo.factory;

import com.example.demo.dto.AddressResponse;
import com.example.demo.dto.AddressesDTO;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.entity.ApiResponseEntity;

public class FactoryAddressDTO {

    public static AddressesEntity convertToEntity(AddressesDTO addressesDTO) {
        AddressesEntity addressesEntity = new AddressesEntity();
        addressesEntity.setId(addressesDTO.getId());
        addressesEntity.setCountry(addressesDTO.getCountry());
        addressesEntity.setCountryCode(addressesDTO.getCountryCode());
        addressesEntity.setCity(addressesDTO.getCity());
        addressesEntity.setLatitude(addressesDTO.getLatitude());
        addressesEntity.setLongitude(addressesDTO.getLongitude());
        addressesEntity.setStreet(addressesDTO.getStreet());
        addressesEntity.setZipcode(addressesDTO.getZipcode());
        addressesEntity.setStreetName(addressesDTO.getStreetName());
        addressesEntity.setBuildingNumber(addressesDTO.getBuildingNumber());

        return addressesEntity;
    }

    public static AddressesDTO convertToDto(AddressesEntity entity) {
        return new AddressesDTO(
                entity.getId(),
                entity.getCountry(),
                entity.getCity(),
                entity.getStreetName(),
                entity.getZipcode(),
                entity.getCountryCode(),
                entity.getBuildingNumber(),
                entity.getStreet(),
                entity.getLatitude(),
                entity.getLongitude()
        );
    }

}
