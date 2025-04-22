package com.example.demo.factory;

import com.example.demo.dto.AddressesDTO;
import com.example.demo.entity.AddressesEntity;

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

//    public static ApiResponseEntity convertToResponse(AddressResponse addressResponse) {
//        ApiResponseEntity apiResponse = new ApiResponseEntity();
//        apiResponse.setCode(addressResponse.getCode());
//        //apiResponse.setData(addressResponse.getData());
//        apiResponse.setSeed(addressResponse.getSeed());
//        apiResponse.setStatus(addressResponse.getStatus());
//        apiResponse.setLocale(addressResponse.getLocale());
//        apiResponse.setTotal(Integer.parseInt(addressResponse.getTotal()));
//        apiResponse.setId(apiResponse.getId());
//        return  apiResponse;
//    }
}
