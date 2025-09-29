package com.example.demo.controller;

import com.example.demo.entity.animals.AnimalEntity;
import com.example.demo.repository.animals.AnimalRepository;
import com.example.demo.service.AnimalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://13.61.35.238"})
@RequestMapping("/api")
public class AnimalController {
    private final AnimalService animalService;
    private final AnimalRepository animalRepository;

    @GetMapping("/animal/fetch")
    public void fetchAndSaveAnimals() {
        animalService.fetchAndSaveAnimals();
        log.info("All animals fetch successfully!");
    }

    @GetMapping("/animals")
    public ResponseEntity<List<AnimalEntity>> getAllAnimals() {
        List<AnimalEntity> animalEntities = animalService.getAllAnimals();
        log.info("All animals read from db successfully!");
        return ResponseEntity.ok(animalEntities);
    }
}
