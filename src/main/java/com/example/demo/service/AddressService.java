package com.example.demo.service;

import com.example.demo.dto.AddressResponse;
import com.example.demo.dto.AddressesDTO;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.factory.FactoryAddressDTO;
import com.example.demo.repository.AddressEntityRepository;
import com.example.demo.repository.ApiResponseRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    Logger logger = LoggerFactory.getLogger(AddressService.class);

    private final RestTemplate restTemplate;
    private final AddressEntityRepository addressEntityRepository;
    private final ApiResponseRepository apiResponseRepository;
    private final String url = "https://fakerapi.it/api/v2/addresses";

    public List<AddressesDTO> fetchAndSaveAddress() {
        AddressResponse response = restTemplate.getForObject(url, AddressResponse.class);

        if (response.getData() != null) {
            List<AddressesEntity> entityList = response.getData().stream()
                    .map(FactoryAddressDTO::convertToEntity)
                    .toList();
            logger.info("Dto to entity convertion was done successfully!");

            addressEntityRepository.saveAll(entityList);
            logger.info("All data were saved successfully into " + AddressesEntity.class);
        }
        return response.getData();
    }

    public List<AddressesEntity> getAllAddresses() {
        return addressEntityRepository.findAllByOrderByIdAsc();
    }

    public List<AddressesEntity> getFilteredAddresses(String country, String city) {
        return addressEntityRepository.findByCountryContainingIgnoreCaseAndCityContainingIgnoreCase(country, city);
    }
}

