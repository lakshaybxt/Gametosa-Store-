package com.gametosa.ecommerce_backend.repository;

import com.gametosa.ecommerce_backend.domain.entities.Cart;
import com.gametosa.ecommerce_backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CartRepository extends JpaRepository<Cart, UUID> {
    Optional<Cart> findByUserId(UUID userId);
    boolean existsByUserId(UUID userId);
}
