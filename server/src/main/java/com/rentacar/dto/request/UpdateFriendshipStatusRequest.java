package com.rentacar.dto.request;

import com.rentacar.model.enumeration.FriendshipStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateFriendshipStatusRequest {

    @NotNull
    private UUID friendshipId;

    @NotNull
    private String  status;
}
