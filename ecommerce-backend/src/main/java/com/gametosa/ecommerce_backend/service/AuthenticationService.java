package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.LoginUserDto;
import com.gametosa.ecommerce_backend.domain.dto.RegisterUserDto;
import com.gametosa.ecommerce_backend.domain.dto.VerifyUserDto;
import com.gametosa.ecommerce_backend.domain.entities.User;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    User signup(RegisterUserDto register);
    UserDetails authenticate(LoginUserDto loginUserDto);
    void verifyUser(VerifyUserDto verifyUserDto);
    void resendVerificationCode(String mobile);
}
