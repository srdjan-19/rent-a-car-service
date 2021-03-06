package com.rentacar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteRentACarResponse {

    private UUID id;

}
