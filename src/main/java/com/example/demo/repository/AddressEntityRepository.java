package com.example.demo.repository;

import com.example.demo.dto.AddressesDTO;
import com.example.demo.entity.AddressesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressEntityRepository extends JpaRepository<AddressesEntity, Long> {
    List<AddressesEntity> findAllByOrderByIdAsc();
}
