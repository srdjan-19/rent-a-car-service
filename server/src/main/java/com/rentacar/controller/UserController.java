package com.rentacar.controller;

import com.rentacar.dto.request.UpdateUserPasswordRequest;
import com.rentacar.dto.request.UpdateUserRequest;
import com.rentacar.dto.response.GetUserResponse;
import com.rentacar.service.AuthService;
import com.rentacar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.UserConverter.getUserResponseFromUser;
import static com.rentacar.converter.UserConverter.getUserResponseFromUsers;


@RestController
@RequestMapping(value="/users")
@RequiredArgsConstructor
public class UserController {

	private final AuthService authService;
	private final UserService userService;

	@GetMapping
	public ResponseEntity<List<GetUserResponse>> findAll(){
		return  ResponseEntity.ok(getUserResponseFromUsers(userService.findAll()));
	}

	@GetMapping(value = "/{id}")
	@PreAuthorize("@userService.checkUser(#userId, #signedIn)")
	public ResponseEntity<GetUserResponse> findUserById(@PathVariable(name = "id") String userId, @AuthenticationPrincipal UUID signedIn){
		return  ResponseEntity.ok(getUserResponseFromUser(userService.findById(signedIn)));
	}

	@PutMapping
	public ResponseEntity<GetUserResponse> update(@RequestBody UpdateUserRequest request, @AuthenticationPrincipal UUID userId){
		return  ResponseEntity.ok(getUserResponseFromUser(userService.update(request, userId)));
	}

	@PutMapping(value = "/password/update")
	public ResponseEntity<String> updatePassword(@RequestBody UpdateUserPasswordRequest request, @AuthenticationPrincipal UUID userId){
		return ResponseEntity.ok(authService.changePassword(request, userId));
	}

}

