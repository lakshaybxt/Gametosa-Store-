package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID userId);
}
