package com.gametosa.ecommerce_backend.domain.entities;

import com.gametosa.ecommerce_backend.domain.Rating;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "product", indexes = {
        @Index(name = "idx_product_name", columnList = "name"),
        @Index(name = "idx_product_brand", columnList = "brand_id"),
        @Index(name = "idx_product_category", columnList = "category_id"),
        @Index(name = "idx_product_price", columnList = "originalPrice"),
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Embedded
    private Rating rating;

    @Column(nullable = false, precision = 10, scale = 2)
    @Min(value = 1, message = "Original price can neither be zero nor negative")
    private BigDecimal originalPrice;

    @Min(value = 0, message = "Discount cannot be negative")
    @Max(value = 100, message = "Discount cannot be exceed 100%")
    private int discount;

    @Column(precision = 10, scale = 2)
    private BigDecimal discountedPrice;

    // Full description - for product detail pages
    @Column(nullable = false, length = 1000)
    private String description;

    // Short description - for product cards/lists
    @Column(nullable = false, length = 500)
    private String shortDescription;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", length = 2048)
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();

    @Builder.Default
    private boolean inStock = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        calculatedDiscountedPrice();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        calculatedDiscountedPrice();
    }

    private void calculatedDiscountedPrice() {
        if(originalPrice != null && discount > 0) {
            BigDecimal discountAmount = originalPrice.multiply(BigDecimal.valueOf(discount))
                    .divide(BigDecimal.valueOf(100));
            this.discountedPrice = originalPrice.subtract(discountAmount);
        } else {
            this.discountedPrice = originalPrice;
        }
    }
}
