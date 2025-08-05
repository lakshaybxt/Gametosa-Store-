package com.gametosa.ecommerce_backend.mapper;

import com.gametosa.ecommerce_backend.domain.dto.response.ProductResponse;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {
    ProductResponse toResponse(Product product);
}
