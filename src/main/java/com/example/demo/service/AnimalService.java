package com.example.demo.service;

import com.example.demo.client.ApiAnimalsClient;
import com.example.demo.dto.AnimalsDTO;
import com.example.demo.entity.animals.AnimalEntity;
import com.example.demo.factory.FactoryAddressDTO;
import com.example.demo.repository.animals.AnimalRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class AnimalService {
    private final ApiAnimalsClient apiAnimalsClient;
    private final AnimalRepository animalRepository;

    @PostConstruct
    public void init() {
        fetchAndSaveAnimals();
        log.info("fetchAndSaveAnimals service initialized!");
    }

    public void fetchAndSaveAnimals() {
        List<AnimalsDTO> animalResponseList = apiAnimalsClient.getAnimals("live_oWoH1yOl1srNkxnxm2AgjQZSx97SFVtxoxlOSSCmO3b0iW641pt1eEDukLiLPOUh");

        List<AnimalEntity> entityList = animalResponseList.stream()
                .map(FactoryAddressDTO::convertAnimalsToEntity)
                .toList();

        animalRepository.saveAll(entityList);
    }

    public List<AnimalEntity> getAllAnimals() {
        return animalRepository.findAll();
    }


}
