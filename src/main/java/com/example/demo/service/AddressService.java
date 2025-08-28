package com.example.demo.service;

import com.example.demo.dto.AddressResponse;
import com.example.demo.dto.AddressesDTO;
import com.example.demo.dto.ArticlesDTO;
import com.example.demo.dto.ArticlesResponse;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.entity.ArticlesEntity;
import com.example.demo.factory.FactoryAddressDTO;
import com.example.demo.repository.AddressEntityRepository;
import com.example.demo.repository.ApiResponseRepository;
import com.example.demo.repository.ArticlesEntityRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AddressService {

    Logger logger = LoggerFactory.getLogger(AddressService.class);

    private final RestTemplate restTemplate;
    private final AddressEntityRepository addressEntityRepository;
    private final ArticlesEntityRepository articlesEntityRepository;
    private final String url = "https://fakerapi.it/api/v2/addresses";
    private final String urlArticles = "https://newsapi.org/v2/everything?q=apple&from=2025-08-14&to=2025-08-14&sortBy=popularity&apiKey=4ff48156ca1d4010bf92762865bb1c99";


    @PostConstruct
    public void init() {
        fetchAndSaveArticles();
        fetchAndSaveAddress();
        logger.info("Articles and Addresses service initialized!");
    }


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

    public List<ArticlesDTO> fetchAndSaveArticles() {
        try {
            ArticlesResponse articlesResponse = restTemplate.getForObject(urlArticles, ArticlesResponse.class);

            if (articlesResponse != null && articlesResponse.getData() != null) {
                List<ArticlesEntity> entityList = articlesResponse.getData().stream()
                        .map(FactoryAddressDTO::convertArticlesToEntity)
                        .toList();
                logger.info("Dto to entity conversion was done successfully!");

                articlesEntityRepository.saveAll(entityList);
                logger.info("All data were saved successfully into " + ArticlesEntity.class.getSimpleName());
            }

            return articlesResponse.getData();
        } catch (Exception e) {
            logger.error("Error while fetching or saving articles", e);
            return Collections.emptyList();
        }
    }


    public List<ArticlesEntity> getAllArticles() {
        return articlesEntityRepository.findAll();
    }

    public Page<ArticlesEntity> getArticles(Pageable pageable) {
        return articlesEntityRepository.findAll(pageable);
    }
}

