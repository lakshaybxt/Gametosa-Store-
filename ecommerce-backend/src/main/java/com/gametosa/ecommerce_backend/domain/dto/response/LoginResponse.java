package com.gametosa.ecommerce_backend.domain.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    String token;
    private Long expiration;
}
