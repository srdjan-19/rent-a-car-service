package com.rentacar.repository;

import com.rentacar.model.RentACarAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RentACarAdminRepository extends JpaRepository<RentACarAdmin, UUID> {

}
