package com.rentacar.service;

import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.Address;
import com.rentacar.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    @Transactional(readOnly = true)
    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Address findById(UUID addressId) {
        return addressRepository.findById(addressId).orElseThrow(() -> new EntityNotFoundException("Address", addressId.toString()));
    }

    @Transactional(readOnly = true)
    public Address findByLongitudeAndLatitude(Double longitude, Double latitude) {
        return addressRepository.findByLongitudeAndLatitude(longitude, latitude);
    }

    @Transactional(readOnly = true)
    public Address save(Address address) {
        return addressRepository.save(address);
    }

}
