package com.gametosa.ecommerce_backend.mapper;

import com.gametosa.ecommerce_backend.domain.dto.response.BrandResponse;
import com.gametosa.ecommerce_backend.domain.entities.Brand;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BrandMapper {
    BrandResponse toResponse(Brand brand);
}
