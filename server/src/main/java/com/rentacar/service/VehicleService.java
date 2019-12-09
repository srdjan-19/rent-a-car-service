package com.rentacar.service;

import com.rentacar.dto.request.CreateRentACarVehicleRequest;
import com.rentacar.dto.request.UpdateVehicleRequest;
import com.rentacar.dto.response.SearchVehicleResponse;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.*;
import com.rentacar.model.enumeration.VehicleType;
import com.rentacar.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.*;

import static com.rentacar.converter.VehicleConverter.toSearchVehicleResponseFromVehicles;
import static com.rentacar.converter.VehicleConverter.toVehicleFromCreateRequest;
import static com.rentacar.utilities.Helpers.formatDate;
import static com.rentacar.utilities.Helpers.formatString;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private static final Logger logger = LoggerFactory.getLogger(VehicleService.class);

    private final VehicleRepository vehicleRepository;
    private final RentACarService rentACarService;

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Vehicle findById(UUID vehicleId) {
        return vehicleRepository.findById(vehicleId).orElseThrow(() -> new EntityNotFoundException("Vehicle", vehicleId.toString()));
    }

    @Transactional(rollbackFor = Exception.class)
    public Vehicle save(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    public List<Vehicle> findByRentACar_Id(UUID rentACarId) {
        String currentDate = formatDate(new Date());
        return vehicleRepository.findRentACarVehicles(rentACarId.toString(), currentDate);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public Vehicle create(CreateRentACarVehicleRequest request) {
        Vehicle vehicle = toVehicleFromCreateRequest(request);
        vehicle.setRentACar(rentACarService.findById(request.getRentACarId()));

        return vehicleRepository.save(vehicle);
    }

    //TODO copy not null properties
    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public Vehicle update(UpdateVehicleRequest request) {
        Vehicle vehicle = vehicleRepository.findById(request.getId()).orElseThrow(() -> new EntityNotFoundException("Vehicle", request.getId().toString()));

        if (request.getModel() != null)
            vehicle.setModel(request.getModel());

        if (request.getBrand() != null)
            vehicle.setBrand(request.getBrand());

        if (request.getYearOfProduction() != null)
            vehicle.setYearOfProduction(request.getYearOfProduction());

        if (request.getNumberOfSeats() != null)
            vehicle.setNumberOfPeople(request.getNumberOfSeats());

        if (request.getPricePerDay() != null)
            vehicle.setPricePerDay(request.getPricePerDay());

        if (request.getType() != null)
            vehicle.setType(VehicleType.valueOf(request.getType()));

        return vehicleRepository.save(vehicle);
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.SERIALIZABLE)
    public UUID delete(UUID vehicleId) {
        String currentDate = formatDate(new Date());
        if (!vehicleRepository.isReserved(vehicleId.toString(), currentDate).isEmpty())
            throw new BadRequestException("Vehicle with id '" + vehicleId + "' is still reserved!");

        vehicleRepository.delete(vehicleRepository.findById(vehicleId).orElseThrow(() -> new EntityNotFoundException("Vehicle", vehicleId.toString())));

        return vehicleId;
    }

    @Transactional(readOnly = true)
    public List<SearchVehicleResponse> search(String pickUpDate, String dropOffDate, String pickUpLocation, String dropOffLocation, String type, int seats, double startRange, double endRange, String rentACarId) throws ParseException {
        int cityCount = 2;

        if (formatString(pickUpDate).compareTo(formatString(dropOffDate)) > 0)
            throw new BadRequestException("Pick up date must be before drop off date!");

        if (pickUpLocation.equals("") && dropOffLocation.equals("")) {
            throw new BadRequestException("Please select pick up or drop off location!");
        }

        if (!pickUpLocation.equals("") && !dropOffLocation.equals("")) {
            pickUpLocation = pickUpLocation.toLowerCase();
            dropOffLocation = dropOffLocation.toLowerCase();

            if(pickUpLocation.equals(dropOffLocation))
                cityCount = 1;

        }

        if (pickUpLocation.equals("") && !dropOffLocation.equals("")) {
            pickUpLocation  = dropOffLocation.toLowerCase();
            dropOffLocation =  dropOffLocation.toLowerCase();
            cityCount = 1;
        }

        if (dropOffLocation.equals("") && !pickUpLocation.equals("")) {
            dropOffLocation  = pickUpLocation.toLowerCase();
            pickUpLocation =  pickUpLocation.toLowerCase();
            cityCount = 1;
        }

        if (type.equals(""))
            type="";

        if (endRange == 0)
            endRange = 1000000;

        if (pickUpDate.equals("null"))
            pickUpDate = null;

        if (dropOffDate.equals("null"))
            dropOffDate = null;

        return toSearchVehicleResponseFromVehicles(vehicleRepository.search(rentACarId, pickUpDate, dropOffDate, pickUpLocation, dropOffLocation, type, seats, startRange, endRange, cityCount), formatString(pickUpDate), formatString(dropOffDate));
    }

    @Transactional(readOnly = true)
    public List<Vehicle> sort(String by, String rentACarId) {
        if (by.equals("brand"))
            return vehicleRepository.sortByBrand(rentACarId);
        else if(by.equals("model"))
            return vehicleRepository.sortByModel(rentACarId);
        else if(by.equals("rating"))
            return vehicleRepository.sortByRating(rentACarId);
        else if(by.equals("yearOfProduction"))
            return vehicleRepository.sortByYearOfProduction(rentACarId);
        else
            throw new BadRequestException("Unknown attribute!");
    }

    @Transactional(readOnly = true)
    public List<Vehicle> getAvailability(String rentACarId, String startDate, String endDate, boolean available) {
        if (startDate.compareTo(endDate) > 0)
            throw new BadRequestException("Start date must be before end date!");

        if (available == true)
            return vehicleRepository.findAllAvailable(rentACarId, startDate, endDate);
        else
            return vehicleRepository.findAllUnavailable(rentACarId, startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<Vehicle> checkAvailability(String vehicleId, String pickUpDate, String dropOffDate) {
        return vehicleRepository.checkAvailability(vehicleId, pickUpDate, dropOffDate);
    }

}
