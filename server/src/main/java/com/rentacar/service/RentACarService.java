package com.rentacar.service;

import com.rentacar.converter.AddressConverter;
import com.rentacar.dto.request.CreateRentACarRequest;
import com.rentacar.dto.request.UpdateRentACarRequest;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityExistsException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.*;
import com.rentacar.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.RentACarConverter.toRentACarFromCreateRequest;

@Service
@RequiredArgsConstructor
public class RentACarService {
    private static final Logger logger = LoggerFactory.getLogger(RentACarService.class);

    private final RentACarRepository rentACarRepository;
    private final RentACarAdminService rentACarAdminService;
    private final AddressService addressService;
    private final UserService userService;

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public List<RentACar> findAll() {
        return this.rentACarRepository.findAll();
    }

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public RentACar findById(UUID id) {
        return rentACarRepository.findById(id).get();
    }

    @Transactional(rollbackFor = Exception.class)
    public RentACar create(CreateRentACarRequest request, UUID adminId) {
        if (rentACarRepository.existsByName(request.getName()))
            throw new EntityExistsException("Rent a car", "name: " + request.getName());

        if (addressService.findByLongitudeAndLatitude(request.getAddress().getLongitude(), request.getAddress().getLatitude()) != null)
            throw new EntityExistsException("Rent a car service", " point " + request.getAddress().getLongitude() + ", " + request.getAddress().getLatitude());

        RentACar rentACar = toRentACarFromCreateRequest(request);
        rentACar.setOwner(rentACarAdminService.findById(adminId));
        rentACar.setAddress(addressService.save(AddressConverter.toAddressFromCreateRequest(request.getAddress())));

        return rentACarRepository.save(rentACar);
    }

    @Transactional(rollbackFor = Exception.class)
    public RentACar save(RentACar rentACar) {
        return rentACarRepository.save(rentACar);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public RentACar update(UpdateRentACarRequest request) {
        RentACar rentACar = rentACarRepository.findById(request.getId()).orElseThrow(() -> new EntityNotFoundException("Rent a car", request.getId().toString()));

        if (rentACarRepository.existsByName(request.getName()) && rentACarRepository.existsById(request.getId()))
            throw new EntityExistsException("Rent a car", "name: " + request.getName());

        if (request.getName() != null && !request.getName().isEmpty())
            rentACar.setName(request.getName());

        if (request.getDescription() != null && !request.getDescription().isEmpty())
            rentACar.setDescription(request.getDescription());

        if (addressService.findByLongitudeAndLatitude(request.getAddress().getLongitude(), request.getAddress().getLatitude()) != null)
            throw new EntityExistsException("Rent a car service", " point " + request.getAddress().getLongitude() + ", " + request.getAddress().getLatitude());

        rentACar.setAddress(addressService.save(AddressConverter.toAddressFromCreateRequest(request.getAddress())));

        return rentACarRepository.save(rentACar);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public void delete(UUID rentACarId) {
        rentACarRepository.findById(rentACarId).orElseThrow( () ->  new EntityNotFoundException("Rent a car", rentACarId.toString()));
        rentACarRepository.deleteById(rentACarId);
    }

    @Transactional(readOnly = true, isolation = Isolation.SERIALIZABLE)
    public List<RentACar> search(String city, String state, String name, String pickUpDate, String dropOffDate) {
        if (pickUpDate.compareTo(dropOffDate) > 0)
            throw new BadRequestException("Pick up date must be before drop off date!");

        if (city.equals("null") || city.isEmpty())
            city = null;
        else
            city = city.toLowerCase();
        if (state.equals("null") || state.isEmpty())
            state = null;
        else
            state = state.toLowerCase();
        if (name.equals("null") || name.isEmpty())
            name = null;
        else
            name = name.toLowerCase();
        if (pickUpDate.equals("null") || pickUpDate.isEmpty())
            pickUpDate = null;
        if (dropOffDate.equals("null") || dropOffDate.isEmpty())
            dropOffDate = null;

        return rentACarRepository.search(city, state, name, pickUpDate, dropOffDate);
    }

    @Transactional(readOnly = true)
    public List<RentACar> sort(String by) {
        if (by.equals("name"))
            return rentACarRepository.sortByName();
        else if(by.equals("address"))
            return rentACarRepository.sortByAddress();
        else if(by.equals("rating"))
            return rentACarRepository.sortByRating();
        else
            throw new BadRequestException("Unknown attribute!");
    }

}
