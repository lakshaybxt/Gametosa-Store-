package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateProductRequest;
import com.gametosa.ecommerce_backend.domain.dto.request.ProductSearchCriteria;
import com.gametosa.ecommerce_backend.domain.dto.request.UpdateProductRequest;
import com.gametosa.ecommerce_backend.domain.dto.response.ProductResponse;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import com.gametosa.ecommerce_backend.mapper.ProductMapper;
import com.gametosa.ecommerce_backend.service.ProductService;
import org.springframework.data.domain.Page;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @PostMapping(path = "/admin/product")
    public ResponseEntity<?> createProduct(@Valid @RequestBody CreateProductRequest request) {
        Product product = productService.createProduct(request);
        ProductResponse response = productMapper.toResponse(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping(path = "/customer/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) String brandId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false)List<String> tags,
            @RequestParam(defaultValue = "false") boolean inStockOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        ProductSearchCriteria criteria = ProductSearchCriteria.builder()
                .keyword(keyword)
                .categoryId(categoryId)
                .brandId(brandId)
                .maxPrice(maxPrice)
                .minPrice(minPrice)
                .tags(tags)
                .inStockOnly(inStockOnly)
                .build();

        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> products = productService.searchProducts(criteria, pageable);
        Page<ProductResponse> response = products.map(productMapper::toResponse);

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/customer/{productId}/personalized")
    public ResponseEntity<List<ProductResponse>> getRecommendation(
            @PathVariable UUID productId,
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Product> recommendation = productService.getRecommendedProducts(productId, limit);
        List<ProductResponse> responses = recommendation.stream()
                .map(productMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping(path = "/customer/{productId}/recommendation")
    public ResponseEntity<List<ProductResponse>> getRecommendedByBrands(
            @PathVariable UUID productId,
            @RequestParam(defaultValue = "5") int limit
    ) {
        List<Product> recommendation = productService.getRecommendedByBrands(productId, limit);
        List<ProductResponse> responses = recommendation.stream()
                .map(productMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping(path = "/customer/product")
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Product> products = productService.getAllProducts(pageable);
        Page<ProductResponse> response = products.map(productMapper::toResponse);

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/customer/product/{productId}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable UUID productId) {
        Product product = productService.getProductById(productId);
        ProductResponse response = productMapper.toResponse(product);

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/customer/product/featured")
    public ResponseEntity<Page<ProductResponse>> getFeaturedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Product> products = productService.searchFeaturedProducts(pageable);
        Page<ProductResponse> response = products.map(productMapper::toResponse);

        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/admin/product/{productId}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable UUID productId,
            @RequestBody UpdateProductRequest request
    ) {
        Product product = productService.updateProduct(productId, request);
        ProductResponse response = productMapper.toResponse(product);

        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/admin/product/{productId}/featured")
    public ResponseEntity<ProductResponse> toggleFeatured (@PathVariable UUID productId) {
        Product product = productService.toggleFeatured(productId);
        ProductResponse response = productMapper.toResponse(product);

        return ResponseEntity.ok(response);
    }

    @PutMapping(path = "/admin/product/{productId}/active")
    public ResponseEntity<ProductResponse> toggleActive (@PathVariable UUID productId) {
        Product product = productService.toggleActive(productId);
        ProductResponse response = productMapper.toResponse(product);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/admin/product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(path = "/admin/product/{productId}/permanent")
    public ResponseEntity<Void> permanentlyDeleteProduct(@PathVariable UUID productId) {
        productService.permanentlyDeleteProduct(productId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping(path = "/admin/product/{productId}/restore")
    public ResponseEntity<ProductResponse> restoreProduct(@PathVariable UUID productId) {
        Product restoredProduct = productService.restoreProduct(productId);
        ProductResponse response =productMapper.toResponse(restoredProduct);
        return ResponseEntity.ok(response);
    }
}