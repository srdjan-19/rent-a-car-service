package com.rentacar.controller;

import com.rentacar.dto.request.CreateDiscountRequest;
import com.rentacar.service.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping
    @RequestMapping("/vehicle")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public void create(@RequestBody CreateDiscountRequest request) throws ParseException {
        discountService.createVehicleDiscount(request);
    }

}
