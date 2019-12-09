package com.rentacar.repository;

import com.rentacar.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, UUID> {

    @Query(value = "SELECT * FROM vehicle v " +
                   "LEFT JOIN rent_a_car_office raco on raco.rent_a_car_id = v.rent_a_car_id " +
                   "LEFT JOIN address a on raco.address_id = a.id " +
                   "WHERE v.id NOT IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE ((:pickUpDate is null and :dropOffDate is null) or vr.start_date <= :dropOffDate AND vr.end_date >= :pickUpDate) " +
                   "OR ((:pickUpDate is null and :dropOffDate is null) or vr.start_date >= :dropOffDate AND vr.end_date <= :pickUpDate)) " +
                   "AND (:type is null OR v.type LIKE %:type%) " +
                   "AND (:seats is null OR v.number_of_people >= :seats) " +
                   "AND ((:startRange is null and :endRange is null) OR v.price_per_day between :startRange and :endRange) " +
                   "AND a.city IN (:pickUpLocation, :dropOffLocation) " +
                   "GROUP BY v.id " +
                   "HAVING COUNT(DISTINCT a.city) = :cityCount " +
                   "AND v.rent_a_car_id = :rentACarId", nativeQuery = true)
    List<Vehicle>
    search(String rentACarId, String pickUpDate, String dropOffDate, String pickUpLocation, String dropOffLocation, String type, int seats, double startRange, double endRange, int cityCount);

    @Query(value = "SELECT DISTINCT * " +
                   "FROM vehicle v " +
                   "WHERE v.id NOT IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE (vr.start_date <= :dropOffDate AND vr.end_date >= :pickUpDate) " +
                   "OR (vr.start_date >= :dropOffDate AND vr.end_date <= :pickUpDate)) " +
                   "AND v.id = :vehicleId", nativeQuery = true)
    List<Vehicle> checkAvailability(String vehicleId, String pickUpDate, String dropOffDate);

    @Query(value = "SELECT * FROM vehicle v " +
                   "WHERE v.id NOT IN " +
                   "(SELECT d.vehicle_id FROM discount as d " +
                   "WHERE d.start_date BETWEEN :currentDate AND :currentDate " +
                   "OR d.end_date BETWEEN :currentDate AND :currentDate " +
                   "GROUP BY d.vehicle_id) " +
                   "AND v.rent_a_car_id = :rentACarId", nativeQuery = true)
    List<Vehicle> findRentACarVehicles(String rentACarId, String currentDate);

    @Query(value = "SELECT * FROM vehicle v WHERE v.rent_a_car_id = :rentACarId " +
                   "ORDER BY v.brand  ASC ", nativeQuery =  true)
    List<Vehicle> sortByBrand(String rentACarId);

    @Query(value = "SELECT * FROM vehicle v WHERE v.rent_a_car_id = :rentACarId " +
                   "ORDER BY v.model ASC ", nativeQuery =  true)
    List<Vehicle> sortByModel(String rentACarId);

    @Query(value = "SELECT * FROM vehicle v WHERE v.rent_a_car_id = :rentACarId " +
                   "ORDER BY v.year_of_production ASC ", nativeQuery =  true)
    List<Vehicle> sortByYearOfProduction(String rentACarId);

    @Query(value = "SELECT * FROM vehicle v WHERE v.rent_a_car_id = :rentACarId " +
                   "ORDER BY v.rating DESC", nativeQuery =  true)
    List<Vehicle> sortByRating(String rentACarId);

    @Query(value = "SELECT DISTINCT * " +
                   "FROM vehicle v " +
                   "WHERE v.id NOT IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE (vr.start_date <= :endDate AND vr.end_date >= :startDate) " +
                   "OR (vr.start_date >= :endDate AND vr.end_date <= :startDate)) " +
                   "AND v.rent_a_car_id = :rentACarId", nativeQuery = true)
    List<Vehicle> findAllAvailable(String rentACarId, String startDate, String endDate);

    @Query(value = "SELECT DISTINCT * " +
                   "FROM vehicle v " +
                   "WHERE v.id IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE (vr.start_date <= :endDate AND vr.end_date >= :startDate) " +
                   "OR (vr.start_date >= :endDate AND vr.end_date <= :startDate)) " +
                   "AND v.rent_a_car_id = :rentACarId", nativeQuery = true)
    List<Vehicle> findAllUnavailable(String rentACarId, String startDate, String endDate);

    @Query(value= "SELECT * FROM vehicle AS v " +
                  "JOIN vehicle_reservation AS vr ON v.id = vr.vehicle_id " +
                  "WHERE vr.vehicle_id = :vid " +
                  "AND vr.end_date >= :currentDate" ,nativeQuery = true)
    List<Vehicle> isReserved(String vid, String currentDate);
}
