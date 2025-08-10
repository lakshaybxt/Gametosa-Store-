package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateProductRequest;
import com.gametosa.ecommerce_backend.domain.dto.request.ProductSearchCriteria;
import com.gametosa.ecommerce_backend.domain.dto.request.UpdateProductRequest;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    Product createProduct(CreateProductRequest request);
    Page<Product> searchProducts(ProductSearchCriteria criteria, Pageable pageable);
    List<Product> getRecommendedProducts(UUID productId, int limit);
    List<Product> getRecommendedByBrands(UUID productId, int limit);
    Product getProductById(UUID productId);
    Page<Product> getAllProducts(Pageable pageable);
    Page<Product> searchFeaturedProducts(Pageable pageable);
    Product updateProduct(UUID productId, UpdateProductRequest request);
    Product toggleFeatured(UUID productId);
    Product toggleActive(UUID productId);
    void deleteProduct(UUID productId);
    void permanentlyDeleteProduct(UUID productId);
    Product restoreProduct(UUID productId);
}
