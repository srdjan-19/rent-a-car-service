package com.rentacar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFriendshipResponse {

    private UUID friendshipId;

    private String friendFirstName;

    private String friendLastName;

}
