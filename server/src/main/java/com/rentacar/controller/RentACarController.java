package com.rentacar.controller;

import com.rentacar.dto.request.CreateRentACarRequest;
import com.rentacar.dto.request.UpdateRentACarRequest;
import com.rentacar.dto.response.*;
import com.rentacar.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.RentACarConverter.*;
import static com.rentacar.converter.VehicleConverter.toGetVehicleResponseFromVehicles;


@RestController
@RequiredArgsConstructor
@RequestMapping("/rent-a-cars")
public class RentACarController {

    private final RentACarService rentACarService;
    private final VehicleService vehicleService;
    private final DiscountService discountService;
    private final VehicleReservationService vehicleReservationService;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<GetRentACarResponse> create(@RequestBody CreateRentACarRequest request, @AuthenticationPrincipal UUID adminId) {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACar(rentACarService.create(request, adminId)));
    }

    @GetMapping
    public ResponseEntity<List<GetRentACarResponse>> findAll() {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACars(rentACarService.findAll()));
    }

    @GetMapping
    @RequestMapping("/{id}")
    public ResponseEntity<GetRentACarResponse> findById(@PathVariable(name = "id") UUID rentACarId) {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACar(rentACarService.findById(rentACarId)));
    }

    @GetMapping
    @RequestMapping("/{id}/vehicles")
    public ResponseEntity<List<GetVehicleResponse>> getRentACarVehicles(@PathVariable(name = "id") UUID rentACarId) {
        return ResponseEntity.ok(toGetVehicleResponseFromVehicles(vehicleService.findByRentACar_Id(rentACarId)));
    }

    @GetMapping("/{id}/vehicles/discount")
    public ResponseEntity<List<GetDiscountedVehicleResponse>> quick(
            @PathVariable(name = "id", required = true) String rentACarId,
            @RequestParam(name = "pickUpDate", required = true) String pickUpDate,
            @RequestParam(name = "dropOffDate", required = true) String dropOffDate
    ) {
        return ResponseEntity.ok(discountService.findVehicles(rentACarId, pickUpDate,dropOffDate));
    }

    @GetMapping("/{id}/vehicles/availability")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<List<GetAvailableRentACarResponse>> availability(@PathVariable("id") String rentACarId, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate, @RequestParam("available") boolean available) throws ParseException {
        return ResponseEntity.ok(toGetAvailableRentACarResponseFromVehicles(vehicleService.getAvailability(rentACarId, startDate, endDate, available)));
    }

    @GetMapping("/{id}/income")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<List<GetRentACarVehicleIncomeResponse>> income(@PathVariable("id") String id, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws ParseException {
        return ResponseEntity.ok(vehicleReservationService.getIncome(id, startDate, endDate));
    }

    @GetMapping("/{id}/busyness")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<List<GetRentACarVehicleBusynessResponse>> busyness(@PathVariable("id") String id, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) throws ParseException {
        return ResponseEntity.ok(vehicleReservationService.getBusyness(id, startDate, endDate));
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    ResponseEntity<GetRentACarResponse> update(@RequestBody UpdateRentACarRequest request) {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACar(rentACarService.update(request)));
    }

    @DeleteMapping
    @RequestMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public void delete(@PathVariable(name = "id") UUID rentACarId) {
        rentACarService.delete(rentACarId);
    }

    @GetMapping
    @RequestMapping("/search")
    public ResponseEntity<List<SearchRentACarResponse>> search(
            @RequestParam(name = "city", required = false) String city,
            @RequestParam(name = "state", required = false) String state,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "pickUpDate", required = false) String pickUpDate,
            @RequestParam(name = "dropOffDate", required = false) String dropOffDate
    ) {
        return ResponseEntity.ok(toSearchRentACarResponseFromRentACars(rentACarService.search(city, state, name, pickUpDate, dropOffDate)));
    }

    @GetMapping("/sort")
    public ResponseEntity<List<GetRentACarResponse>> sort(@RequestParam(name = "by", required = true) String by)  {
        return ResponseEntity.ok(toGetRentACarResponseFromRentACars(rentACarService.sort(by)));
    }

}
