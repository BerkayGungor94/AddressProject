package com.example.demo.controller;

import com.example.demo.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/fetch")
    public ResponseEntity<String> fetchAndSaveAddress() {
        addressService.fetchAndSaveAddress();

        return ResponseEntity.ok("Bsşarılı");
    }


}
