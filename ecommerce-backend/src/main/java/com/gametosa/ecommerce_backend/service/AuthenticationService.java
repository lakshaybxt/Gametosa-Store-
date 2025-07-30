package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.RegisterUserDto;
import com.gametosa.ecommerce_backend.domain.entities.User;
import jakarta.validation.Valid;

public interface AuthenticationService {
    User signup(@Valid RegisterUserDto register);
}
