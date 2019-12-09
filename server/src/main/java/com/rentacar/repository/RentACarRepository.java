package com.rentacar.repository;

import com.rentacar.model.RentACar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RentACarRepository extends JpaRepository<RentACar, UUID> {

    boolean existsByName(String name);

    @Query(value = "SELECT * FROM rent_a_car rac " +
                   "LEFT JOIN rent_a_car_office raco ON raco.rent_a_car_id = rac.id " +
                   "LEFT JOIN address a ON raco.address_id = a.id " +
                   "LEFT JOIN vehicle v ON rac.id = v.rent_a_car_id " +
                   "WHERE v.id NOT IN " +
                   "(SELECT vr.vehicle_id FROM vehicle_reservation AS vr " +
                   "WHERE ((:pickUpDate is null AND :dropOffDate is null) OR vr.start_date <= :dropOffDate AND vr.end_date >= :pickUpDate) " +
                   "OR ((:pickUpDate is null AND :dropOffDate is null) OR vr.start_date >= :dropOffDate AND vr.end_date <= :pickUpDate )) " +
                   "AND (:name is null OR LOWER(rac.name) LIKE %:name%) " +
                   "AND (:city is null OR LOWER(a.city) LIKE %:city%) " +
                   "AND (:state is null OR LOWER(a.state) LIKE %:state%) " +
                   "GROUP BY rac.id", nativeQuery = true)
    List<RentACar> search(String city, String state, String name, String pickUpDate, String dropOffDate);

    @Query(value = "SELECT * FROM rent_a_car rac " +
                   "ORDER BY rac.name ASC", nativeQuery =  true)
    List<RentACar> sortByName();

    @Query(value = "SELECT * FROM rent_a_car rac " +
                   "JOIN address a ON rac.address_id = a.id " +
                   "ORDER BY a.city ASC", nativeQuery =  true)
    List<RentACar> sortByAddress();

    @Query(value = "SELECT * FROM rent_a_car rac " +
                   "ORDER BY rac.rating DESC", nativeQuery =  true)
    List<RentACar> sortByRating();

}
