package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateCategoryRequest;
import com.gametosa.ecommerce_backend.domain.dto.response.CategoryResponse;
import com.gametosa.ecommerce_backend.domain.entities.Category;
import com.gametosa.ecommerce_backend.mapper.CategoryMapper;
import com.gametosa.ecommerce_backend.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping(path = "/admin/category")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CreateUpdateCategoryRequest request) {
        Category category = categoryService.createCategory(request);
        CategoryResponse response = categoryMapper.toResponse(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping(path = "/admin/category/{categoryId}")
     public ResponseEntity<CategoryResponse> updateCategory(
             @PathVariable UUID categoryId,
             @Valid @RequestBody CreateUpdateCategoryRequest request
    ) {
        Category category = categoryService.updateCategory(categoryId, request);
        CategoryResponse response = categoryMapper.toResponse(category);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/admin/category/{categoryId}")
    public ResponseEntity<Void> deleteCategory (@PathVariable UUID categoryId) {
        categoryService.deleteById(categoryId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/customer/category")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        List<CategoryResponse> responses = categories.stream()
                .map(categoryMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responses);
    }

    @GetMapping(path = "/customer/category/{categoryId}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable UUID categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        CategoryResponse response = categoryMapper.toResponse(category);

        return ResponseEntity.ok(response);
    }
}
