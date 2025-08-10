package com.gametosa.ecommerce_backend.repository;

import com.gametosa.ecommerce_backend.domain.dto.request.ProductSearchCriteria;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import com.gametosa.ecommerce_backend.domain.entities.Category;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends
        JpaRepository<Product, UUID>,
        JpaSpecificationExecutor<Product> {
    boolean existsByNameAndBrandAndCategory(String name, Brand brand, Category category);
    Page<Product> findAll(Specification<Product> productSpecification, Pageable pageable);
    List<Product> findTop5ByCategory(Category category);

    @Query("""
        SELECT DISTINCT p FROM Product p
        JOIN p.tags t
        WHERE p.category = :category
        AND t IN :tags
        AND p.id <> :productId
    """)
    Page<Product> findByCategoryAndIdNot(
            @Param("category") Category category,
            @Param("productId") UUID productId,
            @Param("tags") List<String> tags,
            Pageable pageable
    );

    @Query("""
        SELECT DISTINCT p FROM Product p
        WHERE p.brand = :brand
        AND p.id <> :productId
    """)
    Page<Product> findByBrandAndIdNot(Brand brand, UUID productId, Pageable pageable);

    Page<Product> findAllByActive(boolean active, Pageable pageable);
}
