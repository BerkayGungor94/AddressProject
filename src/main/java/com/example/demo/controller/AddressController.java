package com.example.demo.controller;

import com.example.demo.dto.AddressesDTO;
import com.example.demo.entity.AddressesEntity;
import com.example.demo.factory.FactoryAddressDTO;
import com.example.demo.repository.AddressEntityRepository;
import com.example.demo.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final AddressEntityRepository addressEntityRepository;

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





}
