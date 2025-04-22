package com.example.demo.dto.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class AddressResponse {
    private String status;
    private Integer code;
    private String locale;
    private String seed;
    private String total;
    private List<AddressesDTO> data;

    public List<AddressesDTO> getData() {
        return data;
    }
}
