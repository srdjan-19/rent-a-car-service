package com.rentacar.repository;

import com.rentacar.dto.response.GetDiscountedVehicleResponse;
import com.rentacar.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, UUID> {

    @Query(value = "SELECT * FROM discount d " +
                   "WHERE (d.start_date BETWEEN :startDate AND :endDate " +
                   "OR d.end_date BETWEEN :startDate AND :endDate) " +
                   "AND d.vehicle_id = :vehicleId " +
                   "GROUP BY d.vehicle_id", nativeQuery = true)
    List<Discount> check(String vehicleId, String startDate, String endDate);

    @Query(value= "SELECT d.id AS discountId, v.id AS vehicleId, v.model AS model, v.brand AS brand, v.number_of_people AS numberOfSeats, v.year_of_production AS yearOfProduction, " +
                  "v.rating AS rating, DATE(d.start_date) AS pickUpDate, DATE(d.end_date) AS dropOffDate, " +
                  "ROUND((v.price_per_day * (:startDate - :endDate + 1) * (0.01 * (100-d.rate))), 2) AS discounted, (v.price_per_day * (:startDate - :endDate + 1) ) AS originalPrice, " +
                  "d.rate AS discountRate " +
                  "FROM vehicle v " +
                  "JOIN vehicle_reservation vr ON vr.vehicle_id = v.id " +
                  "JOIN discount d ON v.id = d.vehicle_id " +
                  "WHERE (d.start_date >= :startDate AND  d.start_date <= :endDate " +
                  "AND d.end_date >= :startDate AND d.end_date <= :endDate ) " +
                  "AND v.rent_a_car_id = :rentACarId " +
                  "AND v.id NOT IN " +
                  "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                  "WHERE (vr.start_date <= :endDate AND vr.end_date >= :startDate) " +
                  "OR (vr.start_date >= :endDate AND vr.end_date <= :startDate)) " +
                  "GROUP BY d.id ", nativeQuery = true)
    List<GetDiscountedVehicleResponse> findVehicles(String rentACarId, String startDate, String endDate);
}
