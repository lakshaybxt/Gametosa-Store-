package com.gametosa.ecommerce_backend.repository;

import com.gametosa.ecommerce_backend.domain.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    boolean existsByName(String name);
}
