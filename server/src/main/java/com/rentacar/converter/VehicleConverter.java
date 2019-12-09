package com.rentacar.converter;

import com.rentacar.dto.request.CreateRentACarVehicleRequest;
import com.rentacar.dto.response.*;
import com.rentacar.model.Vehicle;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.rentacar.utilities.Helpers.getNumberOfDays;

@Component
public class VehicleConverter {

    public static Vehicle toVehicleFromCreateRequest(CreateRentACarVehicleRequest request) {
        return Vehicle
                .builder()
                .brand(request.getVehicle().getBrand())
                .model(request.getVehicle().getModel())
                .numberOfPeople(request.getVehicle().getNumberOfSeats())
                .pricePerDay(request.getVehicle().getPricePerDay())
                .yearOfProduction(request.getVehicle().getYearOfProduction())
                .type(request.getVehicle().getType())
                .rating(0.0)
                .build();
    }

    public static GetVehicleResponse toGetVehicleResponseFromVehicle(Vehicle vehicle) {
        return GetVehicleResponse
                .builder()
                .id(vehicle.getId())
                .brand(vehicle.getBrand())
                .model(vehicle.getModel())
                .pricePerDay(vehicle.getPricePerDay())
                .rating(vehicle.getRating())
                .yearOfProduction(vehicle.getYearOfProduction())
                .type(vehicle.getType())
                .numberOfSeats(vehicle.getNumberOfPeople())
                .rentACar(vehicle.getRentACar().getName())
                .build();
    }

    public static List<GetVehicleResponse> toGetVehicleResponseFromVehicles(List<Vehicle> vehicles){
        return vehicles.stream()
                .map(vehicle -> toGetVehicleResponseFromVehicle(vehicle))
                .collect(Collectors.toList());
    }

    public static UpdateVehicleResponse toUpdateVehicleResponseFromVehicle(Vehicle vehicle) {
        return UpdateVehicleResponse.builder()
                .id(vehicle.getId())
                .brand(vehicle.getBrand())
                .model(vehicle.getModel())
                .pricePerDay(vehicle.getPricePerDay())
                .rating(vehicle.getRating())
                .yearOfProduction(vehicle.getYearOfProduction())
                .type(vehicle.getType())
                .numberOfSeats(vehicle.getNumberOfPeople())
                .rentACar(vehicle.getRentACar().getName())
                .build();
    }

    public static SearchVehicleResponse toSearchVehicleResponseFromVehicle(Vehicle vehicle, int days)  {
        return SearchVehicleResponse
                .builder()
                .id(vehicle.getId())
                .brand(vehicle.getBrand())
                .model(vehicle.getModel())
                .numberOfSeats(vehicle.getNumberOfPeople())
                .rating(vehicle.getRating())
                .type(vehicle.getType())
                .yearOfProduction(vehicle.getYearOfProduction())
                .pricePerDay(vehicle.getPricePerDay() * days)
                .build();
    }
    public static List<SearchVehicleResponse> toSearchVehicleResponseFromVehicles(List<Vehicle> vehicles, Date pickUpDate, Date dropOffDate) throws ParseException {
        int days = getNumberOfDays(dropOffDate, pickUpDate);

        return vehicles.stream()
                .map(vehicle -> toSearchVehicleResponseFromVehicle(vehicle, days))
                .collect(Collectors.toList());
    }

}
