package com.rentacar.repository;

import com.rentacar.model.RentACarOffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RentACarOfficeRepository extends JpaRepository<RentACarOffice, UUID> {

    List<RentACarOffice> findByRentACar_Id(UUID rentACarId);

    @Query(value = "SELECT * FROM rent_a_car_office raco " +
                   "JOIN address a ON a.id = raco.address_id " +
                   "WHERE raco.rent_a_car_id = :rentACarId " +
                   "AND a.city = :city ", nativeQuery = true)
    List<RentACarOffice> checkLocationCity(String rentACarId, String city);

    @Query(value = "SELECT * FROM rent_a_car_office raco " +
                   "LEFT JOIN rent_a_car rac ON rac.id = raco.rent_a_car_id " +
                   "LEFT JOIN address a ON a.id = rac.address_id " +
                   "LEFT JOIN vehicle v ON v.rent_a_car_id " +
                   "WHERE v.id NOT IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE ((:pickUpDate is null AND :dropOffDate is null ) OR vr.start_date <= :dropOffDate AND vr.end_date >= :pickUpDate) " +
                   "OR ((:pickUpDate is null AND :dropOffDate is null ) OR vr.start_date >= :dropOffDate AND vr.end_date <= :pickUpDate)) " +
                   "AND (:name is null OR rac.name = :name) " +
                   "AND (:city is null OR a.city = :city) " +
                   "AND (:state is null OR a.state = :state) " +
                   "GROUP BY raco.id", nativeQuery = true)
    List<RentACarOffice> search(String city, String state, String name, String pickUpDate, String dropOffDate);

}
