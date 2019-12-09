package com.rentacar.service;

import com.rentacar.dto.request.UpdateUserRequest;
import com.rentacar.exception.BadRequestException;
import com.rentacar.exception.EntityExistsException;
import com.rentacar.exception.EntityNotFoundException;
import com.rentacar.model.User;
import com.rentacar.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static com.rentacar.converter.UserConverter.updateUserFromRequest;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressService addressService;

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
	public User findById(UUID loggedIn) {
		return userRepository.findById(loggedIn).orElseThrow(() -> new EntityNotFoundException("User", loggedIn.toString()));
	}

	@Transactional(readOnly = true)
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional(readOnly = true)
    public boolean existsByPhoneNumber(String phoneNumber) {
        return userRepository.existsByPhoneNumber(phoneNumber);
    }

    @Transactional(rollbackFor = Exception.class)
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional(rollbackFor = Exception.class)
    public User update(UpdateUserRequest request, UUID userId) {

        userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User", userId.toString()));

        if (userRepository.findByEmail(request.getEmail()) != null && !userRepository.findByEmail(request.getEmail()).getId().toString().equals(userId.toString())) {
            throw new EntityExistsException("User", "email " + request.getEmail());
        }

        if (userRepository.findByPhoneNumber(request.getPhoneNumber()) != null && !userRepository.findByPhoneNumber(request.getPhoneNumber()).getId().toString().equals(userId.toString())) {
            throw new EntityExistsException("User", "phone number " + request.getPhoneNumber());
        }

        User user = updateUserFromRequest(request, userRepository.findById(userId).get());
        user.setAddress(addressService.findById(request.getAddressId()));

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean checkUser(String userId, UUID signedId) {
        if (signedId != null && userId.equals(signedId.toString()))
            return true;
        else
            return false;
    }

}
