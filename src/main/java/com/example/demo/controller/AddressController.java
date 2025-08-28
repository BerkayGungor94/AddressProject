package com.example.demo.controller;

import com.example.demo.entity.AddressesEntity;
import com.example.demo.entity.ArticlesEntity;
import com.example.demo.repository.ArticlesEntityRepository;
import com.example.demo.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final ArticlesEntityRepository articlesEntityRepository;

    @GetMapping("/fetch")
    public ResponseEntity<String> fetchAndSaveAddress() {
        addressService.fetchAndSaveAddress();
        return ResponseEntity.ok("Success!");
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressesEntity>> getAllAddresses(
            @RequestParam(required = false, defaultValue = "") String country,
            @RequestParam(required = false, defaultValue = "") String city
    ) {
        List<AddressesEntity> addressesEntityList = addressService.getFilteredAddresses(country, city);
        return ResponseEntity.ok(addressesEntityList);

    }

    @GetMapping("/fetchArticles")
    public ResponseEntity<String> fetchAndSaveArticles() {
        addressService.fetchAndSaveArticles();
        return ResponseEntity.ok("Success!");
    }

    @GetMapping("/articles")
    public Page<ArticlesEntity> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1000000") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return articlesEntityRepository.findAll(pageable);
    }

}
