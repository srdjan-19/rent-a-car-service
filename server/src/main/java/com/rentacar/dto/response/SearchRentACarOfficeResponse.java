package com.rentacar.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRentACarOfficeResponse {

    private UUID id;

    private String name;

    private GetAddressResponse address;

    private List<GetRentACarOffice> offices;

    private String description;

    private Double rating;

}
