package com.example.demo.factory;

import com.example.demo.dto.AddressesDTO;
import com.example.demo.dto.ArticlesDTO;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.entity.ArticlesEntity;

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

    public static ArticlesEntity convertArticlesToEntity(ArticlesDTO articlesDTO) {
        ArticlesEntity articlesEntity = new ArticlesEntity();

//        articlesEntity.setSourceId(articlesDTO.getSourceId());
//        articlesEntity.setSourceName(articlesDTO.getSourceName());
        if (articlesDTO.getSourceDTO().getId() != null) {
        articlesEntity.setSourceId(articlesDTO.getSourceDTO().getId());
        }
        if (articlesDTO.getSourceDTO().getName() != null) {
            articlesEntity.setSourceName(articlesDTO.getSourceDTO().getName());
        }
        articlesEntity.setAuthor(articlesDTO.getAuthor());
        articlesEntity.setTitle(articlesDTO.getTitle());
        articlesEntity.setDescription(articlesDTO.getDescription());
        articlesEntity.setUrl(articlesDTO.getUrl());
        articlesEntity.setUrlToImage(articlesDTO.getUrlToImage());
        articlesEntity.setPublishedAt(articlesDTO.getPublishedAt());
        articlesEntity.setContent(articlesDTO.getContent());

        return articlesEntity;
    }

}
