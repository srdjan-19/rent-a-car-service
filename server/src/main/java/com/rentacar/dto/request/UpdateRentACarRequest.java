package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

import static com.rentacar.utilities.ValidationConstraints.NAME_SIZE;
import static com.rentacar.utilities.ValidationConstraints.DESCRIPTION_SIZE;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRentACarRequest {

    @NotNull
    private UUID id;

    @Size(max = NAME_SIZE)
    private String name;

    @Size(max = DESCRIPTION_SIZE)
    private String description;

    private CreateAddressRequest address;
}
