package com.gametosa.ecommerce_backend.repository;

import com.gametosa.ecommerce_backend.domain.entities.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BrandRepository extends JpaRepository<Brand, UUID> {
    boolean existsByName(String name);
}
