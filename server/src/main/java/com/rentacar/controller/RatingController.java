package com.rentacar.controller;

import com.rentacar.dto.request.CreateRatingRequest;
import com.rentacar.dto.response.GetRentACarResponse;
import com.rentacar.dto.response.GetVehicleResponse;
import com.rentacar.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

import static com.rentacar.converter.RentACarConverter.toGetRentACarResponseFromRentACar;
import static com.rentacar.converter.VehicleConverter.toGetVehicleResponseFromVehicle;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ratings")
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    @RequestMapping("/rent-a-cars")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<GetRentACarResponse> rateRentACar(@RequestBody CreateRatingRequest request, @AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACar(ratingService.rateRentACar(request, userId)));
    }

    @PostMapping
    @RequestMapping("/vehicles")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<GetVehicleResponse> rateVehicle(@RequestBody CreateRatingRequest request, @AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetVehicleResponseFromVehicle(ratingService.rateVehicle(request, userId)));
    }

}
