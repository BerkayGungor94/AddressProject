package com.example.demo.client;

import com.example.demo.dto.AnimalsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "animalClient", url = "https://api.thedogapi.com/v1")
public interface ApiAnimalsClient {
    @GetMapping("/breeds")
    List<AnimalsDTO> getAnimals(@RequestHeader("x-api-key") String xApiKey);
}
