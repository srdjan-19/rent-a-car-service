package com.rentacar.repository;

import com.rentacar.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {

    Address findByLongitudeAndLatitude(Double longitude, Double latitude);

}
