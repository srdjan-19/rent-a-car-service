package com.rentacar.controller;

import com.rentacar.dto.request.CreateFriendshipRequest;
import com.rentacar.dto.request.UpdateFriendshipStatusRequest;
import com.rentacar.dto.response.CreateFriendshipResponse;
import com.rentacar.dto.response.GetFriendshipRequestResponse;
import com.rentacar.dto.response.GetFriendshipResponse;
import com.rentacar.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.FriendshipConverter.toCreateFriendshipResponseFromFriendship;
import static com.rentacar.converter.FriendshipConverter.toGetFriendShipRequestResponseFromFriendships;
import static com.rentacar.converter.FriendshipConverter.toGetFriendshipResponseFromFriendships;
import static com.rentacar.converter.FriendshipConverter.toGetFriendshipResponseFromFriendship;

@RestController
@RequestMapping("/friendships")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipService friendshipService;

    @PostMapping
    public ResponseEntity<CreateFriendshipResponse> create(@RequestBody CreateFriendshipRequest request, @AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toCreateFriendshipResponseFromFriendship(friendshipService.create(request, userId)));
    }

    @GetMapping
    public ResponseEntity<List<GetFriendshipResponse>> findFriends(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetFriendshipResponseFromFriendships(friendshipService.findFriends(userId), userId));
    }

    @PutMapping
    @PreAuthorize("@friendshipService.checkUserFriendship(#request.friendshipId, #userId)")
    public ResponseEntity<GetFriendshipResponse> updateStatus(@RequestBody UpdateFriendshipStatusRequest request, @AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetFriendshipResponseFromFriendship(friendshipService.updateFriendshipStatus(request), userId.toString()));
    }

    @DeleteMapping
    @RequestMapping("/{id}")
    @PreAuthorize("@friendshipService.checkUserFriendship(#friendshipId, #userId)")
    public void remove(@PathVariable("id") UUID friendshipId, @AuthenticationPrincipal UUID userId) {
        friendshipService.remove(friendshipId);
    }

    @GetMapping
    @RequestMapping("/requests")
    public ResponseEntity<List<GetFriendshipRequestResponse>> findRequests(@AuthenticationPrincipal UUID userId) {
        return ResponseEntity.ok(toGetFriendShipRequestResponseFromFriendships(friendshipService.findRequests(userId)));
    }


}
