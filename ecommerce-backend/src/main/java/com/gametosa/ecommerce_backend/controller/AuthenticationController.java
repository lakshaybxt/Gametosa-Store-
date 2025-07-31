package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.LoginUserDto;
import com.gametosa.ecommerce_backend.domain.dto.RegisterUserDto;
import com.gametosa.ecommerce_backend.domain.dto.VerifyUserDto;
import com.gametosa.ecommerce_backend.domain.dto.response.AuthUserResponse;
import com.gametosa.ecommerce_backend.domain.dto.response.LoginResponse;
import com.gametosa.ecommerce_backend.domain.entities.User;
import com.gametosa.ecommerce_backend.mapper.UserMapper;
import com.gametosa.ecommerce_backend.service.AuthenticationService;
import com.gametosa.ecommerce_backend.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserMapper userMapper;

    @PostMapping(path = "/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        AuthUserResponse response = userMapper.toResponse(registeredUser);

        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginUserDto loginUserDto) {
        UserDetails userDetails = authenticationService.authenticate(loginUserDto);

        String token = jwtService.generateToken(userDetails);
        LoginResponse response = LoginResponse.builder()
                .token(token)
                .expiration(jwtService.getExpirationTime())
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping(path = "/verify")
    public ResponseEntity<?> verifyUser(@Valid @RequestBody VerifyUserDto verifyUserDto) {
        try {
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(path = "/resend")
    public ResponseEntity<?> verifyUser(String mobile) {
        try {
            authenticationService.resendVerificationCode(mobile);
            return ResponseEntity.ok("Verification code sent.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
