package com.rentacar.dto.request;

import com.rentacar.model.enumeration.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static com.rentacar.utilities.ValidationConstraints.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateVehicleRequest {

    @NotBlank
    @Size(max = VEHICLE_BRAND_SIZE)
    private String brand;

    @NotBlank
    @Size(max = VEHICLE_MODEL_SIZE)
    private String model;

    @NotBlank
    private VehicleType type;

    @NotNull
    @Range(min = 0)
    private Integer yearOfProduction;

    @NotNull
    @Range(min = 1)
    private Integer numberOfSeats;

    @NotNull
    @Range(min = 0)
    private Double pricePerDay;


}
