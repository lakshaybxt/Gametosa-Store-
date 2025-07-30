package com.gametosa.ecommerce_backend.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    String generateToken(UserDetails userDetails);
    String extractUsername(String token);
    Boolean validateToken(String token, UserDetails userDetails);
    long getExpirationTime();
}
