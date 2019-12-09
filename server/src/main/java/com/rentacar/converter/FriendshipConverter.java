package com.rentacar.converter;

import com.rentacar.dto.response.CreateFriendshipResponse;
import com.rentacar.dto.response.GetFriendshipRequestResponse;
import com.rentacar.dto.response.GetFriendshipResponse;
import com.rentacar.model.Friendship;
import com.rentacar.model.enumeration.FriendshipStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class FriendshipConverter {

    public static Friendship toFriendshipFromCreateRequest(UUID userId) {
        return Friendship
                .builder()
                .status(FriendshipStatus.SENT)
                .sender(userId)
                .build();
    }

    public static CreateFriendshipResponse toCreateFriendshipResponseFromFriendship(Friendship friendship) {
        return CreateFriendshipResponse
                .builder()
                .friendshipId(friendship.getId())
                .friendFirstName(friendship.getSecondMember().getFirstName())
                .friendLastName(friendship.getSecondMember().getLastName())
                .build();
    }

    public static List<GetFriendshipResponse> toGetFriendshipResponseFromFriendships(List<Friendship> friendships, UUID userId) {
        return friendships
                .stream()
                .map(friendship -> toGetFriendshipResponseFromFriendship(friendship, userId.toString()))
                .collect(Collectors.toList());
    }

    public static GetFriendshipResponse toGetFriendshipResponseFromFriendship(Friendship friendship, String userId) {
        return GetFriendshipResponse
                .builder()
                .id(friendship.getId())
                .firstName(friendship.getFirstMember().getId().toString().equals(userId) ? friendship.getSecondMember().getFirstName() : friendship.getFirstMember().getFirstName())
                .lastName(friendship.getFirstMember().getId().toString().equals(userId) ? friendship.getSecondMember().getLastName() : friendship.getFirstMember().getLastName())
                .email(friendship.getFirstMember().getId().toString().equals(userId) ? friendship.getSecondMember().getEmail() : friendship.getFirstMember().getEmail())
                .status(friendship.getStatus())
                .build();
    }

    public static List<GetFriendshipRequestResponse> toGetFriendShipRequestResponseFromFriendships(List<Friendship> friends) {
        return friends
                .stream()
                .map(friend -> toGetFriendShipRequestResponseFromFriendship(friend))
                .collect(Collectors.toList());
    }

    public static GetFriendshipRequestResponse toGetFriendShipRequestResponseFromFriendship(Friendship friendship) {
        return  GetFriendshipRequestResponse
                .builder()
                .friendshipId(friendship.getId())
                .firstName(friendship.getFirstMember().getFirstName())
                .lastName(friendship.getFirstMember().getLastName())
                .status(friendship.getStatus())
                .build();
    }

}
