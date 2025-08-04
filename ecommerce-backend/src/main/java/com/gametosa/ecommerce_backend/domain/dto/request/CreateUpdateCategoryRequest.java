package com.gametosa.ecommerce_backend.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUpdateCategoryRequest {

    @NotBlank(message = "Category name is required")
    private String name;

    @NotBlank(message = "Category description required")
    @Size(min = 5, max = 10, message = "Description must be between {max} and {min} characters")
    private String description;
}
