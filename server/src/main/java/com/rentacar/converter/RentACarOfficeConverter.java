package com.rentacar.converter;

import com.rentacar.dto.request.CreateRentACarOfficeRequest;
import com.rentacar.dto.response.GetRentACarOfficeResponse;
import com.rentacar.dto.response.SearchRentACarOfficeResponse;
import com.rentacar.model.RentACarOffice;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RentACarOfficeConverter {

    public static RentACarOffice toRentACarOfficeFromCreateRequest(CreateRentACarOfficeRequest request) {
        return RentACarOffice
                .builder()
                .build();
    }

    public static GetRentACarOfficeResponse toGetRentACarOfficeResponseFromRentACarOffice(RentACarOffice rentACarOffice) {
        return GetRentACarOfficeResponse.builder()
                .id(rentACarOffice.getId())
                .name(rentACarOffice.getRentACar().getName())
                .address(AddressConverter.toGetAddressResponseFromAddress(rentACarOffice.getRentACar().getAddress()))
                .description(rentACarOffice.getRentACar().getDescription())
                .rating(rentACarOffice.getRentACar().getRating())
                .location(rentACarOffice.getAddress().getStreet() + ", " + rentACarOffice.getAddress().getCity() + ", " + rentACarOffice.getAddress().getState())
                .build();
    }

    public static List<GetRentACarOfficeResponse> toGetRentACarOfficeResponseFromRentACarOffices(List<RentACarOffice> rentACarOffices) {
        return rentACarOffices.stream()
                .map(RentACarOfficeConverter::toGetRentACarOfficeResponseFromRentACarOffice)
                .collect(Collectors.toList());
    }

    public static SearchRentACarOfficeResponse toSearchRentACarOfficeResponseFromRentACarOffice(RentACarOffice rentACarOffice) {
        return SearchRentACarOfficeResponse.builder()
                .id(rentACarOffice.getRentACar().getId())
                .name(rentACarOffice.getRentACar().getName())
                .description(rentACarOffice.getRentACar().getDescription())
                .address((AddressConverter.toGetAddressResponseFromAddress(rentACarOffice.getRentACar().getAddress())))
                .build();
    }

    public static List<SearchRentACarOfficeResponse> toSearchRentACarOfficeResponseFromRentACarOffices(List<RentACarOffice> rentACarOffices) {
        return rentACarOffices.stream()
                .map(RentACarOfficeConverter::toSearchRentACarOfficeResponseFromRentACarOffice)
                .collect(Collectors.toList());
    }

}
