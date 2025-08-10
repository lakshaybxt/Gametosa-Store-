package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateProductRequest;
import com.gametosa.ecommerce_backend.domain.dto.request.ProductSearchCriteria;
import com.gametosa.ecommerce_backend.domain.dto.request.UpdateProductRequest;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import com.gametosa.ecommerce_backend.domain.entities.Category;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import com.gametosa.ecommerce_backend.exceptions.BusinessRuleException;
import com.gametosa.ecommerce_backend.exceptions.ProductAlreadyExistException;
import com.gametosa.ecommerce_backend.repository.ProductRepository;
import com.gametosa.ecommerce_backend.service.BrandService;
import com.gametosa.ecommerce_backend.service.CategoryService;
import com.gametosa.ecommerce_backend.service.ProductService;
import com.gametosa.ecommerce_backend.specification.ProductSpecification;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final BrandService brandService;

    @Transactional
    @Override
    public Product createProduct(CreateProductRequest request) {
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

    @Override
    public List<Product> getRecommendedProducts(UUID productId, int limit) {
        Product product = getProductById(productId);
        Pageable pageable = PageRequest.of(0, limit);
        return productRepository.findByCategoryAndIdNot(
                product.getCategory(), productId, product.getTags(), pageable)
                .getContent();
    }

    @Override
    public List<Product> getRecommendedByBrands(UUID productId, int limit) {
        Product product = getProductById(productId);
        Pageable pageable = PageRequest.of(0, limit);

        return productRepository.findByBrandAndIdNot(product.getBrand(), productId, pageable)
                .getContent();
    }


    @Override
    public Product getProductById(UUID productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with " + productId));
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> searchFeaturedProducts(Pageable pageable) {
        return productRepository.findAllByActive(true, pageable);
    }

    @Override
    public Product updateProduct(UUID productId, UpdateProductRequest request) {
        Product existingProduct = getProductById(productId);

        if(request.getName() != null) {
            existingProduct.setName(request.getName());
        }

        if(request.getInStock() != null) {
            existingProduct.setInStock(request.getInStock());
        }

        if(request.getIsActive() != null) {
            existingProduct.setActive(request.getIsActive());
        }

        if(request.getIsFeatured() != null) {
            existingProduct.setFeatured(request.getIsFeatured());
        }

        if(request.getDescription() != null) {
            existingProduct.setDescription(request.getDescription());
        }

        if(request.getShortDescription() != null) {
            existingProduct.setShortDescription(request.getShortDescription());
        }

        if(request.getColor() != null) {
            existingProduct.setColor(request.getColor());
        }

        if(request.getSize() != null) {
            existingProduct.setSize(request.getSize());
        }

        if(request.getSku() != null) {
            existingProduct.setSku(request.getSku());
        }

        if(request.getDiscount() != null) {
            existingProduct.setDiscount(request.getDiscount());
        }

        if(request.getOriginalPrice() != null) {
            existingProduct.setOriginalPrice(request.getOriginalPrice());
        }

        if(request.getTags() != null) {
            existingProduct.setTags(request.getTags());
        }

        if(request.getWeight() != null) {
            existingProduct.setWeight(request.getWeight());
        }

        if(request.getImageUrls() != null) {
            existingProduct.setImageUrls(request.getImageUrls());
        }

        if(request.getStackQuantity() != null) {
            existingProduct.setStackQuantity(request.getStackQuantity());
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public Product toggleFeatured(UUID productId) {
        Product product = getProductById(productId);

        product.setFeatured(!product.isFeatured());
        return productRepository.save(product);
    }

    @Override
    public Product toggleActive(UUID productId) {
        Product product = getProductById(productId);

        product.setActive(!product.isActive());
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(UUID productId) {
        Product existingProduct = getProductById(productId);

        existingProduct.setActive(false);
        existingProduct.setFeatured(false);
        existingProduct.setInStock(false);

        productRepository.save(existingProduct);
    }

    @Override
    public void permanentlyDeleteProduct(UUID productId) {
        Product existingProduct = getProductById(productId);

//        boolean hasAnyOrder = orderItemRepository.existsByProductId(productId);

//        if(hasAnyOrder) {
//            throw new BusinessRuleException("Cannot permanently delete product with order history");
//        }

        if(existingProduct.isActive() || existingProduct.getUpdatedAt().isAfter(LocalDateTime.now().minusDays(15))) {
            throw new BusinessRuleException("Product must be inactive for at least 15 days before permanent deletion");
        }

        handleProductDeletion(existingProduct);

        productRepository.delete(existingProduct);
    }

    @Override
    public Product restoreProduct(UUID productId) {
        Product product = getProductById(productId);

        product.setActive(true);
        product.setInStock(true);

        return productRepository.save(product);
    }

    private void handleProductDeletion(Product product) {
//        cartItemRepository.deleteProductById(product.getId());
//        wishlistItemRepository.deleteProductById(product.getId());
    }
}
