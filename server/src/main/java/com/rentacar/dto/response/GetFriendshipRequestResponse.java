package com.rentacar.dto.response;

import com.rentacar.model.enumeration.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetFriendshipRequestResponse {

    private UUID friendshipId;

    private String firstName;

    private String lastName;

    private FriendshipStatus status;
}
