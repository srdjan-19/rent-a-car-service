package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRentACarOfficeRequest {

    @NotBlank
    private String city;

    @NotBlank
    private String state;

}
