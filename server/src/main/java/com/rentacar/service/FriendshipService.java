package com.rentacar.service;

import com.rentacar.dto.request.CreateFriendshipRequest;
import com.rentacar.dto.request.UpdateFriendshipStatusRequest;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.Friendship;
import com.rentacar.model.enumeration.FriendshipStatus;
import com.rentacar.repository.FriendshipRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.FriendshipConverter.toFriendshipFromCreateRequest;

@Service
@RequiredArgsConstructor
public class FriendshipService {
    private static final Logger logger = LoggerFactory.getLogger(RentACarService.class);

    private final FriendshipRepository friendshipRepository;
    private final UserService userService;

    @Transactional(rollbackFor = Exception.class)
    public Friendship create(CreateFriendshipRequest request, UUID userId) {
        if (friendshipRepository.checkFriendship(userId.toString(), request.getFriendId().toString(), FriendshipStatus.ACCEPTED.toString()) != null)
            throw new BadRequestException("You are already friends!");

        if (friendshipRepository.checkFriendship(userId.toString(), request.getFriendId().toString(), FriendshipStatus.SENT.toString()) != null)
            throw new BadRequestException("You already sent him an friend request!");

        Friendship friendship = toFriendshipFromCreateRequest(userId);
        friendship.setFirstMember(userService.findById(userId));
        friendship.setSecondMember(userService.findById(request.getFriendId()));

        return friendshipRepository.save(friendship);
    }

    @Transactional(readOnly = true)
    public List<Friendship> findRequests(UUID userId) {
        return friendshipRepository.findRequests(userId.toString());
    }

    @Transactional(readOnly = true)
    public List<Friendship> findFriends(UUID userId) {
        return friendshipRepository.findFriends(userId.toString());
    }

    @Transactional(rollbackFor = Exception.class)
    public Friendship updateFriendshipStatus(UpdateFriendshipStatusRequest request) {
        Friendship friends = friendshipRepository.findById(request.getFriendshipId()).orElseThrow(() -> new EntityNotFoundException("Friendship", request.getFriendshipId().toString()));

        friends.setStatus(FriendshipStatus.valueOf(request.getStatus()));
        friendshipRepository.save(friends);
        return friends;
    }

    @Transactional(rollbackFor = Exception.class)
    public void remove(UUID friendshipId) {
        friendshipRepository.delete(friendshipRepository.findById(friendshipId).orElseThrow(() -> new EntityNotFoundException("Friendship", friendshipId.toString())));
    }

    @Transactional(readOnly = true)
    public Friendship findById(UUID friendshipId) {
        return friendshipRepository.findById(friendshipId).orElseThrow(() -> new EntityNotFoundException("Friendship", friendshipId.toString()));
    }

    @Transactional(readOnly = true)
    public boolean checkUserFriendship(UUID friendshipId, UUID signedId) {
        if (friendshipRepository.findById(friendshipId).get().getFirstMember().getId().toString().equals(signedId.toString())
                || friendshipRepository.findById(friendshipId).get().getSecondMember().getId().toString().equals(signedId.toString())) {
            return true;
        } else {
            return false;
        }
    }

}
