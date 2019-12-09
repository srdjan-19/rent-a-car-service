package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRentACarLocationRequest {

    @NotNull
    private UUID rentACarId;

    @NotNull
    private UpdateRentACarOfficeRequest office;

}
