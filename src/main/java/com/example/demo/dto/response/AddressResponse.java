package com.example.demo.dto.response;

import com.example.demo.dto.request.AddressesDTO;
import lombok.Data;

import java.util.List;

@Data
public class AddressResponse {
    private String status;
    private Integer code;
    private String locale;
    private String seed;
    private String total;
    private List<AddressesDTO> data;
}
