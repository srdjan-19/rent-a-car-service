package com.rentacar.service;

import com.rentacar.converter.RatingConverter;
import com.rentacar.dto.request.CreateRatingRequest;
import com.rentacar.exception.BadRequestException;
import com.rentacar.model.Rating;
import com.rentacar.model.RentACar;
import com.rentacar.model.Vehicle;
import com.rentacar.model.VehicleReservation;
import com.rentacar.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

import static com.rentacar.converter.RatingConverter.toRatingFromCreateRequest;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserService userService;
    private final RentACarService rentACarService;
    private final VehicleService vehicleService;
    private final VehicleReservationService vehicleReservationService;

    @Transactional(rollbackFor = Exception.class)
    public RentACar rateRentACar(CreateRatingRequest request, UUID userId) {
        VehicleReservation vehicleReservation = vehicleReservationService.findById(request.getReservationId());

        if (vehicleReservation.getEndDate().compareTo(new Date()) >= 0)
            throw new BadRequestException("You did not return vehicle yet!");

        if (ratingRepository.checkIfUserAlreadyRateRentACar(userId.toString(), vehicleReservation.getVehicle().getRentACar().getId().toString()) != null)
            throw new BadRequestException("You already rate this rent a car service!");

        Rating rating = toRatingFromCreateRequest(request);
        rating.setRentACar(vehicleReservation.getVehicle().getRentACar());
        rating.setUser(userService.findById(userId));
        ratingRepository.save(rating);

        vehicleReservation.getVehicle().getRentACar().setRating(ratingRepository.getRentACarAverageMark(vehicleReservation.getVehicle().getRentACar().getId().toString()));

        return rentACarService.save(vehicleReservation.getVehicle().getRentACar());
    }

    @Transactional(rollbackFor = Exception.class)
    public Vehicle rateVehicle(CreateRatingRequest request, UUID userId) {
        VehicleReservation vehicleReservation = vehicleReservationService.findById(request.getReservationId());

        if (vehicleReservation.getEndDate().compareTo(new Date()) >= 0)
            throw new BadRequestException("You did not return vehicle yet!");

        if (ratingRepository.checkIfUserAlreadyRateVehicle(userId.toString(), vehicleReservation.getVehicle().getId().toString()) != null)
            throw new BadRequestException("You already rate this vehicle!");

        Rating rating = toRatingFromCreateRequest(request);
        rating.setVehicle(vehicleReservation.getVehicle());
        rating.setUser(userService.findById(userId));
        ratingRepository.save(rating);

        vehicleReservation.getVehicle().setRating(ratingRepository.getVehicleAverageMark(vehicleReservation.getVehicle().getId().toString()));

        return vehicleService.save(vehicleReservation.getVehicle());
    }

}
