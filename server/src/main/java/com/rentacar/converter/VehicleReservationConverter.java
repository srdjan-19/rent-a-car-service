package com.rentacar.converter;

import com.rentacar.dto.request.CreateVehicleQuickReservationRequest;
import com.rentacar.dto.request.CreateVehicleReservationRequest;
import com.rentacar.dto.response.CreateVehicleReservationResponse;
import com.rentacar.dto.response.GetVehicleReservationResponse;
import com.rentacar.model.VehicleReservation;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

import static com.rentacar.utilities.Helpers.formatDate;

@Component
public class VehicleReservationConverter {

    public static VehicleReservation toVehicleReservationFromCreateRequest(CreateVehicleReservationRequest request){
        return VehicleReservation.builder()
                .startDate(request.getPickUpDate())
                .endDate(request.getDropOffDate())
                .build();
    }

    public static VehicleReservation toVehicleReservationFromQuickCreateRequest(CreateVehicleQuickReservationRequest request) throws ParseException {
        return VehicleReservation.builder()
                .price(request.getPrice())
                .build();
    }

    public static CreateVehicleReservationResponse toCreateVehicleReservationResponseFromVehicleReservation(VehicleReservation vehicleReservation) {
        return CreateVehicleReservationResponse
                .builder()
                .vehicleId(vehicleReservation.getVehicle().getId())
                .build();
    }

    public static GetVehicleReservationResponse toGetVehicleReservationResponseFromVehicleReservation(VehicleReservation vehicleReservation) {
        return GetVehicleReservationResponse
                .builder()
                .reservationId(vehicleReservation.getId())
                .vehicleId(vehicleReservation.getVehicle().getId())
                .vehicle(vehicleReservation.getVehicle().getBrand() + " " + vehicleReservation.getVehicle().getModel())
                .vehicleRating(vehicleReservation.getVehicle().getRating())
                .yearOfProduction(vehicleReservation.getVehicle().getYearOfProduction())
                .rentACarId(vehicleReservation.getVehicle().getRentACar().getId())
                .rentACar(vehicleReservation.getVehicle().getRentACar().getName())
                .rentACarRating(vehicleReservation.getVehicle().getRentACar().getRating())
                .address(vehicleReservation.getVehicle().getRentACar().getAddress().getCity() + ", " + vehicleReservation.getVehicle().getRentACar().getAddress().getState()  )
                .pickUpDate(formatDate(vehicleReservation.getStartDate()))
                .dropOffDate(formatDate(vehicleReservation.getEndDate()))
                .price(vehicleReservation.getPrice())
                .build();
    }

    public static List<GetVehicleReservationResponse> toGetVehicleReservationResponseFromVehicleReservations(List<VehicleReservation> vehicleReservations) {
        return vehicleReservations.stream()
                .map(vehicleReservation -> toGetVehicleReservationResponseFromVehicleReservation((vehicleReservation)))
                .collect(Collectors.toList());
    }

}
