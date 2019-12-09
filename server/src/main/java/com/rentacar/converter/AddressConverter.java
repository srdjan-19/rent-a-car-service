package com.rentacar.converter;

import com.rentacar.dto.request.CreateAddressRequest;
import com.rentacar.dto.response.GetAddressResponse;
import com.rentacar.model.Address;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AddressConverter {
    
    public static Address toAddressFromCreateRequest(CreateAddressRequest request) {
        return Address.builder()
                .city(request.getCity())
                .state(request.getState())
                .street(request.getStreet())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .build();
    }

    public static List<GetAddressResponse> toGetAddressesResponseFromAddresses(List<Address> addresses) {
        return addresses.stream()
                .map(address -> toGetAddressResponseFromAddress(address)).collect(Collectors.toList());

    }

    public static GetAddressResponse toGetAddressResponseFromAddress(Address address) {
        return GetAddressResponse.builder()
                .id(address.getId())
                .city(address.getCity())
                .state(address.getState())
                .street(address.getStreet())
                .latitude(address.getLatitude())
                .longitude(address.getLongitude())
                .build();
    }

}
