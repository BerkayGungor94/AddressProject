package com.example.demo.factory;

import com.example.demo.dto.AddressesDTO;
import com.example.demo.dto.AnimalsDTO;
import com.example.demo.dto.ArticlesDTO;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.entity.ArticlesEntity;
import com.example.demo.entity.animals.AnimalEntity;

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

    public static ArticlesEntity convertArticlesToEntity(ArticlesDTO articlesDTO) {
        ArticlesEntity articlesEntity = new ArticlesEntity();
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

    public static AnimalEntity convertAnimalsToEntity(AnimalsDTO animalsDTO) {
        AnimalEntity animalEntity = new AnimalEntity();
        if (animalsDTO.getId() != null) {
            animalEntity.setId(animalsDTO.getId());
            animalEntity.setName(animalsDTO.getName());
            animalEntity.setBred_for(animalsDTO.getBred_for());
            animalEntity.setBreed_group(animalsDTO.getBreed_group());
            animalEntity.setLife_span(animalsDTO.getLife_span());
            animalEntity.setTemperament(animalsDTO.getTemperament());
            animalEntity.setOrigin(animalsDTO.getOrigin());
            animalEntity.setReference_image_id(animalsDTO.getReference_image_id());
            animalEntity.setImage_id(animalsDTO.getImage().getId());
            animalEntity.setWidth(animalsDTO.getImage().getWidth());
            animalEntity.setHeight(animalsDTO.getImage().getHeight());
            animalEntity.setUrl(animalsDTO.getImage().getUrl());

            animalEntity.setImperialH(animalsDTO.getHeight().getImperial());
            animalEntity.setMetricH(animalsDTO.getHeight().getMetric());
            animalEntity.setImperialW(animalsDTO.getWeight().getImperial());
            animalEntity.setMetricW(animalsDTO.getWeight().getMetric());
        }
        return animalEntity;
    }

}
