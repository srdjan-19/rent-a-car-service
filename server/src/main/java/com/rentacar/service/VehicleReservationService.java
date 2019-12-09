package com.rentacar.service;

import com.rentacar.dto.request.CreateVehicleQuickReservationRequest;
import com.rentacar.dto.request.CreateVehicleReservationRequest;
import com.rentacar.dto.response.GetRentACarVehicleBusynessResponse;
import com.rentacar.dto.response.GetRentACarVehicleIncomeResponse;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.Discount;
import com.rentacar.model.Vehicle;
import com.rentacar.model.VehicleReservation;
import com.rentacar.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.*;

import static com.rentacar.converter.VehicleReservationConverter.toVehicleReservationFromCreateRequest;
import static com.rentacar.converter.VehicleReservationConverter.toVehicleReservationFromQuickCreateRequest;
import static com.rentacar.utilities.Helpers.formatDate;
import static com.rentacar.utilities.Helpers.getNumberOfDays;


@Service
@RequiredArgsConstructor
public class VehicleReservationService {
    private static final Logger logger = LoggerFactory.getLogger(RentACarService.class);

    private final VehicleReservationRepository vehicleReservationRepository;
    private final VehicleService vehicleService;
    private final DiscountService discountService;
    private final RentACarOfficeService rentACarOfficeService;
    private final UserService userService;

    @Transactional(readOnly = true)
    public List<VehicleReservation> get(UUID userId) {
        return vehicleReservationRepository.findByUserId(userId.toString());
    }

    @Transactional(readOnly = true)
    public VehicleReservation findById(UUID reservationId) {
        return vehicleReservationRepository.findById(reservationId).orElseThrow(() -> new EntityNotFoundException("Vehicle reservation", reservationId.toString()));
    }

    @Transactional(rollbackFor = Exception.class)
    public VehicleReservation reserve(CreateVehicleReservationRequest request, UUID userId) throws ParseException {
        Vehicle vehicle = vehicleService.findById(request.getVehicleId());

        if (request.getPickUpDate().compareTo(request.getDropOffDate()) > 0)
            throw new BadRequestException("Pick up date must be before drop off date!");

        if (vehicleService.checkAvailability(request.getVehicleId().toString(), formatDate(request.getPickUpDate()),  formatDate(request.getDropOffDate())).size() == 0) {
            throw new BadRequestException("Vehicle is not available in that period of time!");
        }

        if (rentACarOfficeService.checkLocationCity(vehicle.getRentACar().getId().toString(), request.getPickUpLocation()).size() == 0) {
            throw new BadRequestException("Rent a car service does not have office at that pick up location!");
        }

        if (rentACarOfficeService.checkLocationCity(vehicle.getRentACar().getId().toString(), request.getDropOffLocation()).size() == 0) {
            throw new BadRequestException("Rent a car service does not have office at that drop off location!");
        }

        VehicleReservation vehicleReservation = toVehicleReservationFromCreateRequest(request);
        vehicleReservation.setUser(userService.findById(userId));
        vehicleReservation.setVehicle(vehicleService.findById(request.getVehicleId()));
        int days = getNumberOfDays(request.getDropOffDate(), request.getPickUpDate());
        vehicleReservation.setPrice(vehicleReservation.getVehicle().getPricePerDay() * days );

        return vehicleReservationRepository.save(vehicleReservation);
    }

    @Transactional(rollbackFor = Exception.class)
    public VehicleReservation quickReserve(CreateVehicleQuickReservationRequest request, UUID userId) throws ParseException {
        Discount discount = discountService.findById(request.getDiscountId());

        if (vehicleService.checkAvailability(discount.getVehicle().getId().toString(), discount.getStartDate().toString(),  discount.getEndDate().toString()).size() == 0) {
            throw new BadRequestException("Vehicle is not available in that period of time!");
        }

        VehicleReservation vehicleReservation = toVehicleReservationFromQuickCreateRequest(request);
        vehicleReservation.setUser(userService.findById(userId));
        vehicleReservation.setVehicle(discount.getVehicle());
        vehicleReservation.setStartDate(discount.getStartDate());
        vehicleReservation.setEndDate(discount.getEndDate());

        return vehicleReservationRepository.save(vehicleReservation);
    }

    @Transactional(rollbackFor = Exception.class)
    public UUID cancel(UUID vehicleReservationId, UUID userId) {
        vehicleReservationRepository.findById(vehicleReservationId).orElseThrow(() -> new EntityNotFoundException("Reservation", vehicleReservationId.toString()));

        if (Math.abs(checkCancelAvailability(vehicleReservationRepository.findById(vehicleReservationId).get().getEndDate(), new Date())) <= 3)
            throw new BadRequestException("You can not cancel reservation anymore!");

        vehicleReservationRepository.deleteById(vehicleReservationId);

        return vehicleReservationId;
    }

    @Transactional(readOnly = true)
    public List<GetRentACarVehicleIncomeResponse> getIncome(String id, String startDate, String endDate) throws ParseException {
        if (startDate.compareTo(endDate) > 0)
            throw new BadRequestException("Start date must be before end date!");

        return vehicleReservationRepository.getIncome(id, startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<GetRentACarVehicleBusynessResponse> getBusyness(String id, String startDate, String endDate) throws ParseException {
        if (startDate.compareTo(endDate) > 0)
            throw new BadRequestException("Start date must be before end date!");

        return vehicleReservationRepository.getBusyness(id, startDate, endDate);
    }

    @Transactional(readOnly = true)
    public boolean isThisMyReservation(UUID reservationId, UUID userId) {
        if(vehicleReservationRepository.findById(reservationId).get().getUser().getId().toString().equals(userId.toString()))
            return true;
        else
            return false;
    }

    private int checkCancelAvailability(Date endDate, Date currentDate) {
        long diff = currentDate.getTime() - endDate.getTime();

        float nDays = (diff / (1000*60*60*24));
        return (int) nDays + 1;
    }

}
