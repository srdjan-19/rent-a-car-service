package com.rentacar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetVehicleReservationResponse {

    private UUID reservationId;

    private String vehicle;

    private UUID vehicleId;

    private Double vehicleRating;

    private Integer yearOfProduction;

    private UUID rentACarId;

    private String rentACar;

    private Double rentACarRating;

    private String address;

    private String pickUpDate;

    private String dropOffDate;

    private Double price;

}
