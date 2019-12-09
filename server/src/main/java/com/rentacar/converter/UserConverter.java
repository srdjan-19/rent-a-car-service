package com.rentacar.converter;

import com.rentacar.dto.request.CreateUserRequest;
import com.rentacar.dto.request.UpdateUserRequest;
import com.rentacar.dto.response.CreateUserResponse;
import com.rentacar.dto.response.GetUserResponse;
import com.rentacar.model.User;
import com.rentacar.model.enumeration.Role;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserConverter {

    public static User toUserFromCreateRequest(CreateUserRequest request) {
        return User.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .role(Role.USER)
                .isEnabled(false)
                .build();
    }

    public static User updateUserFromRequest(UpdateUserRequest request, User user) {
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        return user;
    }


    public static CreateUserResponse createUserResponseFromUser(User user) {
        return CreateUserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .message("Check your email to complete registration!")
                .build();
    }

    public static List<GetUserResponse> getUserResponseFromUsers(List<User> friends) {
        return friends
                .stream()
                .map(user -> getUserResponseFromUser(user))
                .collect(Collectors.toList());
    }

    public static GetUserResponse getUserResponseFromUser(User user){
        return  GetUserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .city(user.getAddress().getCity())
                .state(user.getAddress().getState())
                .build();
    }

}

