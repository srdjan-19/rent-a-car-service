package com.rentacar.repository;

import com.rentacar.dto.response.GetRentACarVehicleBusynessResponse;
import com.rentacar.dto.response.GetRentACarVehicleIncomeResponse;
import com.rentacar.model.VehicleReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VehicleReservationRepository extends JpaRepository<VehicleReservation, UUID> {

    @Query(value= "SELECT v.brand AS brand, v.model AS model, sum(price) AS income " +
                  "FROM vehicle_reservation vr " +
                  "JOIN vehicle v ON v.id = vr.vehicle_id " +
                  "WHERE vr.start_date BETWEEN :startDate AND :endDate " +
                  "AND vr.end_date BETWEEN :startDate AND :endDate " +
                  "AND v.rent_a_car_id = :rentACarId " +
                  "GROUP BY vr.vehicle_id ", nativeQuery = true)
    List<GetRentACarVehicleIncomeResponse> getIncome(String rentACarId, String startDate, String endDate);

    @Query(value= "SELECT v.brand AS brand, v.model AS model, count(vr.vehicle_id) AS busyness " +
                  "FROM vehicle_reservation vr " +
                  "JOIN vehicle v ON v.id = vr.vehicle_id " +
                  "WHERE vr.start_date BETWEEN :startDate AND :endDate " +
                  "AND vr.end_date BETWEEN :startDate AND :endDate " +
                  "AND v.rent_a_car_id = :rentACarId " +
                  "GROUP BY v.id ", nativeQuery = true)
    List<GetRentACarVehicleBusynessResponse> getBusyness(String rentACarId, String startDate, String endDate);

    @Query(value= "SELECT * FROM vehicle_reservation as vr " +
                  "WHERE vr.user_id = :userId " ,nativeQuery = true)
    List<VehicleReservation> findByUserId(String userId);

}
