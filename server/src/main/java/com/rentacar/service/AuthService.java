package com.rentacar.service;

import com.rentacar.converter.UserConverter;
import com.rentacar.dto.request.CreateUserRequest;
import com.rentacar.dto.request.LoginUserRequest;
import com.rentacar.dto.request.UpdateUserPasswordRequest;
import com.rentacar.dto.response.LoginUserResponse;
import com.rentacar.exception.BadRequestException;
import com.rentacar.model.RentACarAdmin;
import com.rentacar.model.User;
import com.rentacar.model.VerificationToken;
import com.rentacar.security.JwtTokenUtil;
import com.rentacar.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Calendar;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private static  final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserService userService;
    private final RentACarAdminService rentACarAdminService;
    private final AddressService addressService;
    private final UserDetailsServiceImpl userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final EmailService emailService;
    private final VerificationTokenService verificationTokenService;
    private final UserConverter userConverter;

    @Transactional(rollbackFor = Exception.class)
    public User register(HttpServletRequest servletRequest, CreateUserRequest request) throws IOException, MessagingException {
        if (userService.findByEmail(request.getEmail()) == null) {
            throw new BadRequestException("Email '" + request.getEmail() +  "' already in use!");
        }

        if (userService.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new BadRequestException("Phone number '" + request.getPhoneNumber() +  "' already in use!");
        }

        if (!request.getPassword().equals(request.getPassword2nd()))
            throw new BadRequestException("Passwords do not match!");

        request.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));

        User user = userConverter.toUserFromCreateRequest(request);
        user.setAddress(addressService.findById(request.getAddressId()));

        String appUrl = servletRequest.getRequestURI();
        emailService.sendConfirmation(appUrl, userService.findByEmail(request.getEmail()));

        return userService.save(user);
    }

    @Transactional(rollbackFor = Exception.class)
    public String confirmRegistration(String token) {
        VerificationToken verificationToken = verificationTokenService.findByToken(token);

        if (verificationToken == null) {
            throw new RuntimeException("Token does not exist!");
        }

        Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            verificationTokenService.delete(verificationToken);
            throw new RuntimeException("Token is not valid anymore!");
        }

        User user = verificationToken.getUser();
        user.setIsEnabled(true);
        userService.save(user);

        return "Account is activated!";
    }

    @Transactional(readOnly = true)
    public LoginUserResponse login(LoginUserRequest request) {
        try {
                User user = userDetailsService.loadUserByUsername(request.getEmail());

                if(user == null)
                    throw new BadRequestException("Invalid email-password combination.");

                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, request.getPassword(), user.getAuthorities());
                this.authenticationManager.authenticate(authentication);

                if (authentication.isAuthenticated()) {
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    String token = jwtTokenUtil.generateAuthToken(user);

                    if (user.getAuthorities().toArray()[0].toString().equals("RENT_A_CAR_ADMIN")){
                        RentACarAdmin rentACarAdmin = rentACarAdminService.findById(user.getId());
                        return LoginUserResponse
                                .builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .token(token)
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .phoneNumber(user.getPhoneNumber())
                                .role(user.getAuthorities().toArray()[0].toString())
                                .isNotFirstLogin(rentACarAdmin.isNotFirstLogin())
                                .build();
                    } else {
                    return LoginUserResponse
                            .builder()
                            .id(user.getId())
                            .email(user.getEmail())
                            .token(token)
                            .firstName(user.getFirstName())
                            .lastName(user.getLastName())
                            .phoneNumber(user.getPhoneNumber())
                            .role(user.getAuthorities().toArray()[0].toString())
                            .build();
                    }
                }
        } catch (AuthenticationException e) {
            throw new BadRequestException("Invalid combination email-password.");
        }

        throw new BadRequestException("Invalid combination email-password.");
    }

    @Transactional(rollbackFor = Exception.class)
    public String changePassword(UpdateUserPasswordRequest request, UUID userId) {
        try {
            User user = userService.findById(userId);

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, request.getOldPassword(), user.getAuthorities());
            this.authenticationManager.authenticate(authentication);

            if (authentication.isAuthenticated()) {

                if (request.getOldPassword().equals(request.getNewPassword()))
                    throw new RuntimeException("You need to change your password!");

                user.setPassword(bCryptPasswordEncoder.encode(request.getNewPassword()));

                return "You have been successfully changed your password!";
            }
        } catch (AuthenticationException e) {
            throw new BadRequestException("Incorrect old password.");
        }

        return "Invalid credentials.";
    }

}