package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateBrandRequest;
import com.gametosa.ecommerce_backend.domain.dto.response.BrandResponse;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import com.gametosa.ecommerce_backend.mapper.BrandMapper;
import com.gametosa.ecommerce_backend.service.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;
    private final BrandMapper brandMapper;

    @PostMapping(path = "/admin/brand")
    // @PreAuthorize("hasRole('Admin')") # User either this or security config admin urls
    public ResponseEntity<BrandResponse> createBrand(@Valid @RequestBody CreateUpdateBrandRequest request) {
        Brand brand = brandService.createBrand(request);
        BrandResponse response = brandMapper.toResponse(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(path = "/admin/brand/{brandId}")
    public ResponseEntity<BrandResponse> updateBrand(
            @PathVariable UUID brandId,
            @Valid @RequestBody CreateUpdateBrandRequest request
    ) {
        Brand brand = brandService.updateBrand(brandId, request);
        BrandResponse response = brandMapper.toResponse(brand);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/admin/brand/{brandId}")
    public ResponseEntity<Void> deleteBrand(@PathVariable UUID brandId) {
        brandService.deleteById(brandId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customer/brand")
    public ResponseEntity<List<BrandResponse>> getAllBrands() {
        List<Brand> brands = brandService.getAllBrands();
        List<BrandResponse> responses = brands.stream()
                .map(brandMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/customer/brand/{brandId}")
    public ResponseEntity<BrandResponse> getBrandById(@PathVariable UUID brandId) {
        Brand brand = brandService.getBrandById(brandId);
        BrandResponse response = brandMapper.toResponse(brand);
        return ResponseEntity.ok(response);
    }
}
