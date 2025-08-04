package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateBrandRequest;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

public interface BrandService {
    Brand createBrand(CreateUpdateBrandRequest request);
    Brand getBrandById(UUID brandId);
    List<Brand> getAllBrands();
    Brand updateBrand(UUID brandId, CreateUpdateBrandRequest request);
    void deleteById(UUID brandId);
}
