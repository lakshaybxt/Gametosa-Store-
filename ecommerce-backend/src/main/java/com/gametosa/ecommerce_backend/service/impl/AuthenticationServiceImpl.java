package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.Role;
import com.gametosa.ecommerce_backend.domain.dto.LoginUserDto;
import com.gametosa.ecommerce_backend.domain.dto.RegisterUserDto;
import com.gametosa.ecommerce_backend.domain.dto.VerifyUserDto;
import com.gametosa.ecommerce_backend.domain.entities.User;
import com.gametosa.ecommerce_backend.exceptions.UserAlreadyExistsException;
import com.gametosa.ecommerce_backend.repository.UserRepository;
import com.gametosa.ecommerce_backend.service.AuthenticationService;
import com.gametosa.ecommerce_backend.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final SmsService smsService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

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
                .verificationCodeExpiration(LocalDateTime.now().plusMinutes(15))
                .build();

        User savedUser = userRepository.save(user);
        sendVerificationCode(savedUser);

        return savedUser;
    }

    @Override
    public UserDetails authenticate(LoginUserDto loginUserDto) {
        User user = userRepository.findByMobileNumber(loginUserDto.getMobile())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with the mobile number."));

        if(!user.isEnabled()) {
            throw new RuntimeException("Account not verified yet. Please verify your account");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserDto.getMobile(), loginUserDto.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
        return userDetailsService.loadUserByUsername(loginUserDto.getMobile());
    }

    @Override
    public void verifyUser(VerifyUserDto verifyUserDto) {
        Optional<User> optionalUser = userRepository.findByMobileNumber(verifyUserDto.getMobile());

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiration().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired.");
            }

            if(user.getVerificationCode().equals(verifyUserDto.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiration(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code.");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void resendVerificationCode(String mobile) {
        Optional<User> optionalUser = userRepository.findByMobileNumber(mobile);

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();

            if(user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }

            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiration(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);
            sendVerificationCode(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private void sendVerificationCode(User user) {
        String message = "Your OTP code is: " + user.getVerificationCode();
        smsService.sendSms(user.getMobileNumber(), message);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
