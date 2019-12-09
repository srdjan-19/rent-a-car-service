package com.rentacar.service;

import com.rentacar.model.VerificationToken;
import com.rentacar.repository.VerificationTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationTokenRepository verificationTokenRepository;

    @Transactional(readOnly = true)
    VerificationToken findByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    };

    @Transactional(rollbackFor = Exception.class)
    public void delete(VerificationToken verificationToken) {
        verificationTokenRepository.delete(verificationToken);
    }

    @Transactional(rollbackFor = Exception.class)
    public void save(VerificationToken registrationToken) {
        verificationTokenRepository.save(registrationToken);
    }

}
