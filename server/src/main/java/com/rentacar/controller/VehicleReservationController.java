package com.rentacar.controller;


import com.rentacar.dto.request.CreateVehicleQuickReservationRequest;
import com.rentacar.dto.request.CreateVehicleReservationRequest;
import com.rentacar.dto.response.CreateVehicleReservationResponse;
import com.rentacar.dto.response.GetVehicleReservationResponse;
import com.rentacar.service.VehicleReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.VehicleReservationConverter.toCreateVehicleReservationResponseFromVehicleReservation;
import static com.rentacar.converter.VehicleReservationConverter.toGetVehicleReservationResponseFromVehicleReservations;

@RestController
@RequiredArgsConstructor
@RequestMapping("/vehicle-reservations")
public class VehicleReservationController {

    private final VehicleReservationService vehicleReservationService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<CreateVehicleReservationResponse> reserve(@RequestBody CreateVehicleReservationRequest request, @AuthenticationPrincipal UUID userId) throws ParseException {
        return ResponseEntity.ok(toCreateVehicleReservationResponseFromVehicleReservation(vehicleReservationService.reserve(request, userId)));
    }

    @PostMapping
    @RequestMapping("/quick")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<CreateVehicleReservationResponse> quickReserve(@RequestBody CreateVehicleQuickReservationRequest request, @AuthenticationPrincipal UUID userId) throws ParseException {
        return ResponseEntity.ok(toCreateVehicleReservationResponseFromVehicleReservation(vehicleReservationService.quickReserve(request, userId)));
    }

    @GetMapping("/user")
    @PreAuthorize("hasAnyAuthority('USER')")
    public ResponseEntity<List<GetVehicleReservationResponse>> get(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetVehicleReservationResponseFromVehicleReservations(vehicleReservationService.get(userId)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("@vehicleReservationService.isThisMyReservation(#vehicleReservationId, #userId)")
    public ResponseEntity<UUID> cancel(@PathVariable("id") UUID vehicleReservationId, @AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(vehicleReservationService.cancel(vehicleReservationId, userId));
    }

}
