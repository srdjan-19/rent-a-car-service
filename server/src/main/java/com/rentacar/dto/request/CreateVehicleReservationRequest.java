package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateVehicleReservationRequest {

    @NotNull
    private UUID vehicleId;

    @NotNull
    private Date pickUpDate;

    @NotNull
    private Date dropOffDate;

    @NotEmpty
    private String pickUpLocation;

    @NotEmpty
    private String dropOffLocation;

}
