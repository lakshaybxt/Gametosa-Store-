package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.Role;
import com.gametosa.ecommerce_backend.domain.dto.RegisterUserDto;
import com.gametosa.ecommerce_backend.domain.entities.User;
import com.gametosa.ecommerce_backend.exceptions.UserAlreadyExistsException;
import com.gametosa.ecommerce_backend.repository.UserRepository;
import com.gametosa.ecommerce_backend.service.AuthenticationService;
import com.gametosa.ecommerce_backend.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final SmsService smsService;

    @Override
    public User signup(RegisterUserDto register) {

        if(userRepository.existsByMobileNumber(register.getMobile())) {
            throw new UserAlreadyExistsException("User with mobile number " + register.getMobile() + " already exists.");
        }

        User user = User.builder()
                .email(register.getEmail())
                .username(register.getF_name() + register.getL_name())
                .f_name(register.getF_name())
                .l_name(register.getL_name())
                .mobileNumber(register.getMobile())
                .password(encoder.encode(register.getPassword()))
                .roles(Set.of(Role.CUSTOMER))
                .verificationCode(generateVerificationCode())
                .verificationCodeExpiration(LocalDateTime.now().plusMinutes(60))
                .build();

        User savedUser = userRepository.save(user);
        sendVerficationCode(savedUser);

        return savedUser;
    }

    private void sendVerficationCode(User user) {
        String message = "Your OTP code is: " + user.getVerificationCode();
        smsService.sendSms(user.getMobileNumber(), message);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
