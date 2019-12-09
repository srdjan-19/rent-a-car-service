package com.rentacar.dto.response;

import com.rentacar.model.Friendship;
import com.rentacar.model.enumeration.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetFriendshipResponse {

    private UUID id;

    private String firstName;

    private String lastName;

    private String email;

    private FriendshipStatus status;
}
