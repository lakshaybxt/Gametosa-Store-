package com.gametosa.ecommerce_backend.mapper;

import com.gametosa.ecommerce_backend.domain.dto.response.AuthUserResponse;
import com.gametosa.ecommerce_backend.domain.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    AuthUserResponse toResponse(User user);
}
