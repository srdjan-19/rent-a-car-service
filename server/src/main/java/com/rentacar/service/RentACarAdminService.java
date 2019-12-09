package com.rentacar.service;

import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.RentACarAdmin;
import com.rentacar.repository.RentACarAdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RentACarAdminService {

    private final RentACarAdminRepository rentACarAdminRepository;

    @Transactional(readOnly = true)
    public RentACarAdmin findById(UUID id) {
        return rentACarAdminRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Rent a car admin", id.toString()));
    }

}
