package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateProductRequest;
import com.gametosa.ecommerce_backend.domain.dto.request.ProductSearchCriteria;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import com.gametosa.ecommerce_backend.domain.entities.Category;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import com.gametosa.ecommerce_backend.exceptions.ProductAlreadyExistException;
import com.gametosa.ecommerce_backend.repository.ProductRepository;
import com.gametosa.ecommerce_backend.service.BrandService;
import com.gametosa.ecommerce_backend.service.CategoryService;
import com.gametosa.ecommerce_backend.service.ProductService;
import com.gametosa.ecommerce_backend.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final BrandService brandService;

    @Transactional
    @Override
    public Product createProduct(CreateUpdateProductRequest request) {
        Brand brand = brandService.getBrandById(request.getBrandId());
        Category category = categoryService.getCategoryById(request.getCategoryId());

        if(productRepository.existsByNameAndBrandAndCategory(request.getName(), brand, category)) {
            throw new ProductAlreadyExistException(
                    String.format("Product '%s' already exists for brand '%s' in category '%s'",
                            request.getName(), brand.getName(), category.getName())
            );
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .shortDescription(request.getShortDescription())
                .originalPrice(request.getOriginalPrice())
                .discount(request.getDiscount())
                .imageUrls(request.getImageUrls())
                .color(request.getColor())
                .size(request.getSize())
                .sku(request.getSku())
                .tags(request.getTags())
                .weight(request.getWeight())
                .inStock(request.isInStock())
                .isFeatured(request.isFeatured())
                .isActive(request.isActive())
                .stackQuantity(request.getStackQuantity())
                .brand(brand)
                .category(category)
                .build();

        return productRepository.save(product);

    }

    @Override
    public Page<Product> searchProducts(ProductSearchCriteria criteria, Pageable pageable) {
        return productRepository.findAll(ProductSpecification.withCriteria(criteria), pageable);
    }
}
