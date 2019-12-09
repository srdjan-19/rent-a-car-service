package com.rentacar.converter;

import com.rentacar.dto.request.CreateRentACarRequest;
import com.rentacar.dto.response.*;
import com.rentacar.model.RentACar;
import com.rentacar.model.Vehicle;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static com.rentacar.converter.AddressConverter.toGetAddressResponseFromAddress;

@Component
public class RentACarConverter {

    public static RentACar toRentACarFromCreateRequest(CreateRentACarRequest request) {
        return RentACar.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public static GetRentACarResponse toGetRentACarResponseFromRentACar(RentACar rentACar) {
        return GetRentACarResponse.builder()
                .id(rentACar.getId())
                .name(rentACar.getName())
                .description(rentACar.getDescription())
                .rating(rentACar.getRating())
                .address(toGetAddressResponseFromAddress(rentACar.getAddress()))
                .build();
    }

    public static List<GetRentACarResponse> toGetRentACarResponseFromRentACars(List<RentACar> rentACars) {
        return rentACars.stream()
                .map(RentACarConverter::toGetRentACarResponseFromRentACar)
                .collect(Collectors.toList());
    }

    public static SearchRentACarResponse toSearchRentACarResponseFromRentACar(RentACar rentACar) {
        return SearchRentACarResponse
                .builder()
                .id(rentACar.getId())
                .name(rentACar.getName())
                .description(rentACar.getDescription())
                .address(toGetAddressResponseFromAddress(rentACar.getAddress()))
                .rating(rentACar.getRating())
                .build();
    }

    public static List<SearchRentACarResponse> toSearchRentACarResponseFromRentACars(List<RentACar> rentACars) {
        return rentACars.stream()
                .map(RentACarConverter::toSearchRentACarResponseFromRentACar)
                .collect(Collectors.toList());
    }

    public static List<GetAvailableRentACarResponse> toGetAvailableRentACarResponseFromVehicles(List<Vehicle> vehicles) {
        return  vehicles.stream()
                .map(vehicle -> toGetAvailableRentACarResponseFromVehicle(vehicle))
                .collect(Collectors.toList());
    }

    public static GetAvailableRentACarResponse toGetAvailableRentACarResponseFromVehicle(Vehicle vehicle) {
        return GetAvailableRentACarResponse
                .builder()
                .brand(vehicle.getBrand())
                .model(vehicle.getModel())
                .numberOfSeats(vehicle.getNumberOfPeople())
                .yearOfProduction(vehicle.getYearOfProduction())
                .rentACarName(vehicle.getRentACar().getName())
                .build();
    }

}
