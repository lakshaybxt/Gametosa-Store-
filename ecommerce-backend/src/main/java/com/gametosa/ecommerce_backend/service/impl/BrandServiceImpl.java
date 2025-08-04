package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateBrandRequest;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import com.gametosa.ecommerce_backend.exceptions.BrandAlreadyExistException;
import com.gametosa.ecommerce_backend.repository.BrandRepository;
import com.gametosa.ecommerce_backend.service.BrandService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Transactional
    @Override
    public Brand createBrand(CreateUpdateBrandRequest request) {
        if(brandRepository.existsByName(request.getName())) {
            throw new BrandAlreadyExistException("Brand with " + request.getName() + " already exist");
        }

        Brand brand = Brand.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return brandRepository.save(brand);
    }

    @Override
    public Brand getBrandById(UUID brandId) {
        return brandRepository.findById(brandId)
                .orElseThrow(() -> new EntityNotFoundException("Brand not found with userId: " + brandId));
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Transactional
    @Override
    public Brand updateBrand(UUID brandId, CreateUpdateBrandRequest request) {
        Brand existingBrand = getBrandById(brandId);

        if(!existingBrand.getName().equals(request.getName()) &&
                brandRepository.existsByName(request.getName())) {
            throw new BrandAlreadyExistException("Brand with name '" + request.getName() +"' already exist");
        }

        existingBrand.setName(request.getName());
        existingBrand.setDescription(request.getDescription());

        return brandRepository.save(existingBrand);
    }

    @Transactional
    @Override
    public void deleteById(UUID brandId) {
        Brand existingBrand = getBrandById(brandId);
        brandRepository.delete(existingBrand);
    }
}
