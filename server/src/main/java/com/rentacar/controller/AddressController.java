package com.rentacar.controller;

import com.rentacar.dto.response.GetAddressResponse;
import com.rentacar.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.rentacar.converter.AddressConverter.toGetAddressesResponseFromAddresses;

@RestController
@RequestMapping(value="/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<GetAddressResponse>> get() {
        return ResponseEntity.ok(toGetAddressesResponseFromAddresses(addressService.findAll()));
    }

}
