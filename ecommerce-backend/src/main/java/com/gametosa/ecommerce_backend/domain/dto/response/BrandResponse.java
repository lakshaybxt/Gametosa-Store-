package com.gametosa.ecommerce_backend.domain.dto.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class BrandResponse {
    private UUID id;
    private String name;
    private String description;
}
