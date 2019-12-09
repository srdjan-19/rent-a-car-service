package com.rentacar.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateDiscountRequest {

    @NotNull
    private UUID vehicleId;

    @NotNull
    private Double rate;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;

}
