package com.rentacar.controller;


import com.rentacar.dto.request.CreateRentACarOfficeRequest;
import com.rentacar.dto.response.GetRentACarOfficeResponse;
import com.rentacar.dto.response.SearchRentACarOfficeResponse;
import com.rentacar.service.RentACarOfficeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.RentACarOfficeConverter.*;

@RestController
@RequestMapping("/rent-a-car-offices")
@RequiredArgsConstructor
public class RentACarOfficeController {

    private final RentACarOfficeService rentACarOfficeService;

    @GetMapping
    public ResponseEntity<List<GetRentACarOfficeResponse>> findAll() {
        return ResponseEntity.ok(toGetRentACarOfficeResponseFromRentACarOffices(rentACarOfficeService.findAll()));
    }

    @GetMapping
    @RequestMapping("/{id}")
    public ResponseEntity<List<GetRentACarOfficeResponse>> findByRentACar(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(toGetRentACarOfficeResponseFromRentACarOffices(rentACarOfficeService.findByRentACarId(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public ResponseEntity<GetRentACarOfficeResponse> create(@RequestBody CreateRentACarOfficeRequest request) {
        return ResponseEntity.ok(toGetRentACarOfficeResponseFromRentACarOffice(rentACarOfficeService.create(request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('RENT_A_CAR_ADMIN')")
    public void delete(@PathVariable("id") UUID rentACarLocationId) {
        rentACarOfficeService.delete(rentACarLocationId);
    }

    @GetMapping
    @RequestMapping("/search")
    public ResponseEntity<List<SearchRentACarOfficeResponse>> search(
            @RequestParam(name = "city", required = false) String city,
            @RequestParam(name = "state", required = false) String state,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "pickUpDate", required = false) String pickUpDate,
            @RequestParam(name = "dropOffDate", required = false) String dropOffDate
    ) {
        return ResponseEntity.ok(toSearchRentACarOfficeResponseFromRentACarOffices(rentACarOfficeService.search(city, state, name, pickUpDate, dropOffDate)));
    }

}
