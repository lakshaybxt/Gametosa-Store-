package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.dto.request.CreateUpdateCategoryRequest;
import com.gametosa.ecommerce_backend.domain.entities.Category;
import com.gametosa.ecommerce_backend.exceptions.CategoryAlreadyExistException;
import com.gametosa.ecommerce_backend.repository.CategoryRepository;
import com.gametosa.ecommerce_backend.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CreateUpdateCategoryRequest request) {
        if(categoryRepository.existsByName(request.getName())) {
            throw new CategoryAlreadyExistException("Category with " + request.getName() + " already exist");
        }

        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        categoryRepository.save(category);
        return null;
    }

    @Override
    public Category getCategoryById(UUID categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with userId: " + categoryId));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    @Override
    public Category updateCategory(UUID categoryId, CreateUpdateCategoryRequest request) {
        Category existingCategory = getCategoryById(categoryId);

        /*
         First we are checking if there is an update in name or not if it is then we
         check for if that name already exist in repo or not
         */
        if(!existingCategory.getName().equals(request.getName()) &&
        categoryRepository.existsByName(request.getName())) {
            throw new CategoryAlreadyExistException("Category with name '" + request.getName() +"' already exist");
        }

        existingCategory.setName(request.getName());
        existingCategory.setDescription(request.getDescription());

        return categoryRepository.save(existingCategory);
    }

    @Transactional
    @Override
    public void deleteById(UUID categoryId) {
        Category existingCategory = getCategoryById(categoryId);
        categoryRepository.delete(existingCategory);
    }
}
