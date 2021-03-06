package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import static com.rentacar.utilities.ValidationConstraints.NAME_SIZE;
import static com.rentacar.utilities.ValidationConstraints.DESCRIPTION_SIZE;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRentACarRequest {

    @NotBlank
    @Size(max = NAME_SIZE)
    private String name;

    @NotBlank
    @Size(max = DESCRIPTION_SIZE)
    private String description;

    @NotNull
    private CreateAddressRequest address;

}
