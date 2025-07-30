package com.gametosa.ecommerce_backend.repository;

import com.gametosa.ecommerce_backend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByMobileNumber(String number);
    boolean existsByUsername(String username);
    Optional<User> findByMobileNumber(String number);
}
