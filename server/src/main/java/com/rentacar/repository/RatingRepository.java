package com.rentacar.repository;

import com.rentacar.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface RatingRepository extends JpaRepository<Rating, UUID> {

    @Query(value = "SELECT AVG(mark) FROM rating r " +
                   "WHERE r.rent_a_car_id = :rentACarId", nativeQuery = true)
    Double getRentACarAverageMark(String rentACarId);

    @Query(value = "SELECT AVG(mark) FROM rating r " +
                   "WHERE r.vehicle_id = :vehicleId", nativeQuery = true)
    Double getVehicleAverageMark(String vehicleId);

    @Query(value = "SELECT * FROM rating r " +
                   "WHERE r.vehicle_id = :vehicleId " +
                   "AND r.user_id = :userId ", nativeQuery = true)
    Rating checkIfUserAlreadyRateVehicle(String userId, String vehicleId);

    @Query(value = "SELECT * FROM rating r " +
                   "WHERE r.rent_a_car_id = :rentACarId " +
                   "AND r.user_id = :userId ", nativeQuery = true)
    Rating checkIfUserAlreadyRateRentACar(String userId, String rentACarId);

}
