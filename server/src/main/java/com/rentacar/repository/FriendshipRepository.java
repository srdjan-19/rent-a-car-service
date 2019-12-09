package com.rentacar.repository;

import com.rentacar.model.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, UUID> {

    @Query(value = "SELECT * FROM friendship as f " +
                   "WHERE (f.first_member_id = :userId " +
                   "OR f.second_member_id = :userId) " +
                   "AND f.sender != :userId " +
                   "AND f.status = 'SENT' ", nativeQuery = true)
    List<Friendship> findRequests(String userId);

    @Query(value = "SELECT * FROM friendship as f " +
                   "WHERE (f.first_member_id = :userId " +
                   "OR f.second_member_id = :userId) " +
                   "AND f.sender != :userId " +
                   "AND f.status = 'ACCEPTED' ", nativeQuery = true)
    List<Friendship> findFriends(String userId);

    @Query(value = "SELECT * FROM friendship as f " +
                   "WHERE (f.first_member_id = :userId " +
                   "OR f.second_member_id = :userId) " +
                   "AND (f.first_member_id = :friend " +
                   "OR f.second_member_id = :friend) " +
                   "AND f.status = :status", nativeQuery = true)
    Friendship checkFriendship(String userId, String friend, String status);

}
