package com.rentacar.controller;

import com.rentacar.dto.request.CreateUserRequest;
import com.rentacar.dto.request.LoginUserRequest;
import com.rentacar.dto.response.CreateUserResponse;
import com.rentacar.dto.response.LoginUserResponse;
import com.rentacar.model.User;
import com.rentacar.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.rentacar.converter.UserConverter.createUserResponseFromUser;

@RestController
@RequestMapping(value="/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    @RequestMapping(value = "/registration")
    public ResponseEntity<CreateUserResponse> register(HttpServletRequest servletRequest, @RequestBody CreateUserRequest request) throws IOException, MessagingException {
        User user = authService.register(servletRequest, request);
        return ResponseEntity.ok(createUserResponseFromUser(user));
    }

    @GetMapping
    @RequestMapping(value = "/registration/confirm")
    public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) {
        return ResponseEntity.ok(authService.confirmRegistration(token));
    }

    @PostMapping
    @RequestMapping(value = "/login")
    public ResponseEntity<LoginUserResponse> login(@RequestBody LoginUserRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

//    @PutMapping
//    @RequestMapping(value = "/password/update")
//    public ResponseEntity<ChangePasswordResponse> updatePassword(@RequestBody ChangePasswordRequest request) {
//        return ResponseEntity.ok(toChangePasswordResponse(authService.updatePassword(request)));
//    }

}
