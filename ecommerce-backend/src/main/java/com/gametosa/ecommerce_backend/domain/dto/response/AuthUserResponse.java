package com.gametosa.ecommerce_backend.domain.dto.response;

import com.gametosa.ecommerce_backend.domain.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthUserResponse {
    private UUID id;
    private String username;
    private String f_name;
    private String l_name;
    private String email;
    private String password;
    private String mobileNumber;
    Set<Role> roles = new HashSet<>();
}
