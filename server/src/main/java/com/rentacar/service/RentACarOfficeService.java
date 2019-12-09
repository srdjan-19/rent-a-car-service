package com.rentacar.service;

import com.rentacar.converter.AddressConverter;
import com.rentacar.dto.request.CreateRentACarOfficeRequest;
import com.rentacar.exception.EntityExistsException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.RentACarOffice;
import com.rentacar.repository.RentACarOfficeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.RentACarOfficeConverter.toRentACarOfficeFromCreateRequest;

@Service
@RequiredArgsConstructor
public class RentACarOfficeService {
    private static final Logger logger = LoggerFactory.getLogger(RentACarOfficeService.class);

    private final RentACarOfficeRepository rentACarOfficeRepository;
    private final AddressService addressService;
    private final RentACarService rentACarService;

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public List<RentACarOffice> findAll() {
        return rentACarOfficeRepository.findAll();
    }

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    public List<RentACarOffice> findByRentACarId(UUID id) {
        return rentACarOfficeRepository.findByRentACar_Id(id);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public RentACarOffice create(CreateRentACarOfficeRequest request) {
        if (addressService.findByLongitudeAndLatitude(request.getAddress().getLongitude(), request.getAddress().getLatitude()) != null)
            throw new EntityExistsException("Rent a car office", " point " + request.getAddress().getLongitude() + ", " + request.getAddress().getLatitude());

        RentACarOffice rentACarOffice = toRentACarOfficeFromCreateRequest(request);
        rentACarOffice.setAddress(addressService.save(AddressConverter.toAddressFromCreateRequest(request.getAddress())));
        rentACarOffice.setRentACar(rentACarService.findById(request.getRentACarId()));

        return rentACarOfficeRepository.save(rentACarOffice);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public void delete(UUID rentACarLocationId) {
        rentACarOfficeRepository.findById(rentACarLocationId).orElseThrow(() -> new EntityNotFoundException("Rent a car office", rentACarLocationId.toString()));
        rentACarOfficeRepository.deleteById(rentACarLocationId);
    }

    @Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE)
    public List<RentACarOffice> search(String city, String state, String name, String pickUpDate, String dropOffDate) {
        return rentACarOfficeRepository.search(city, state, name, pickUpDate, dropOffDate);
    }

    @Transactional(readOnly = true)
    public List<RentACarOffice> checkLocationCity(String rentACarId, String pickUpLocation) {
        return rentACarOfficeRepository.checkLocationCity(rentACarId, pickUpLocation);
    }

}
