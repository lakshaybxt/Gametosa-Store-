package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateCategoryRequest;
import com.gametosa.ecommerce_backend.domain.entities.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    Category createCategory(CreateUpdateCategoryRequest request);
    Category getCategoryById(UUID categoryId);
    List<Category> getAllCategories();
    Category updateCategory(UUID categoryId, CreateUpdateCategoryRequest request);
    void deleteById(UUID categoryId);
}
