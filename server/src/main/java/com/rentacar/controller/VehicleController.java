package com.rentacar.controller;

import com.rentacar.dto.request.CreateRentACarVehicleRequest;
import com.rentacar.dto.request.UpdateVehicleRequest;
import com.rentacar.dto.response.GetVehicleResponse;
import com.rentacar.dto.response.SearchVehicleResponse;
import com.rentacar.dto.response.UpdateVehicleResponse;
import com.rentacar.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.VehicleConverter.*;


@RestController
@RequestMapping("/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<GetVehicleResponse>> get() {
        return ResponseEntity.ok(toGetVehicleResponseFromVehicles(vehicleService.findAll()));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<GetVehicleResponse> create(@RequestBody CreateRentACarVehicleRequest request) {
        return ResponseEntity.ok(toGetVehicleResponseFromVehicle(vehicleService.create(request)));
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<UpdateVehicleResponse> update(@RequestBody UpdateVehicleRequest request) {
        return ResponseEntity.ok(toUpdateVehicleResponseFromVehicle(vehicleService.update(request)));
    }

    @DeleteMapping
    @RequestMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<UUID> delete(@PathVariable(name = "id") UUID vehicleId) {
        return ResponseEntity.ok(vehicleService.delete(vehicleId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<SearchVehicleResponse>> search(
            @RequestParam(name = "pickUpDate") String pickUpDate,
            @RequestParam(name = "dropOffDate") String dropOffDate,
            @RequestParam(name = "pickUpLocation") String pickUpLocation,
            @RequestParam(name = "dropOffLocation") String dropOffLocation,
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(name = "seats"    , required = false) int seats,
            @RequestParam(name = "startRange", required = false) double startRange,
            @RequestParam(name = "endRange", required = false) double endRange,
            @RequestParam(name = "rentACarId", required = false) String rentACarId
    ) throws ParseException {
        return ResponseEntity.ok(vehicleService.search(pickUpDate, dropOffDate, pickUpLocation, dropOffLocation, type, seats, startRange, endRange, rentACarId));
    }

    @GetMapping("/sort")
    public ResponseEntity<List<GetVehicleResponse>> sort(@RequestParam(name = "by", required = true) String by, @RequestParam(name = "rentACarId", required = true) String rentACarId) {
        return ResponseEntity.ok(toGetVehicleResponseFromVehicles(vehicleService.sort(by, rentACarId)));
    }

}
