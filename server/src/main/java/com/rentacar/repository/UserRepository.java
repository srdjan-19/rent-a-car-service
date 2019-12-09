package com.rentacar.repository;

import com.rentacar.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByPhoneNumber(String phoneNumber);

    User findByEmail(String email);

    User findByPhoneNumber(String phoneNumber);

}
