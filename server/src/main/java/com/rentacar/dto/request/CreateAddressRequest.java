package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static com.rentacar.utilities.ValidationConstraints.CITY_SIZE;
import static com.rentacar.utilities.ValidationConstraints.STREET_SIZE;
import static com.rentacar.utilities.ValidationConstraints.STATE_SIZE;
import static com.rentacar.utilities.ValidationConstraints.LONGITUDE_MAX;
import static com.rentacar.utilities.ValidationConstraints.LATITUDE_MAX;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAddressRequest {
    @NotBlank
    @Size(max = STREET_SIZE)
    private String street;

    @NotBlank
    @Size(max = CITY_SIZE)
    private String city;

    @NotBlank
    @Size(max = STATE_SIZE)
    private String state;

    @NotNull
    @Range(min=0, max=LONGITUDE_MAX)
    private Double longitude;

    @NotNull
    @Range(min=0 , max=LATITUDE_MAX)
    private Double latitude;

}
