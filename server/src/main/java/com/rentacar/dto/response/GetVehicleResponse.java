package com.rentacar.dto.response;

import com.rentacar.model.enumeration.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetVehicleResponse {

    private UUID id;

    private String brand;

    private String model;

    private Integer yearOfProduction;

    private int numberOfSeats;

    private VehicleType type;

    private Double rating;

    private Double pricePerDay;

    private String rentACar;

}
