package com.rentacar.security;

import com.rentacar.model.User;
import com.rentacar.repository.UserRepository;
import com.rentacar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.userService.findByEmail(email);
    }

}

