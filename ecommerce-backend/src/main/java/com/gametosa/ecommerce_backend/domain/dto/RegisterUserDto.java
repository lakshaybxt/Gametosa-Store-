package com.gametosa.ecommerce_backend.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    @NotBlank(message = "User mobile number is required")
    @Pattern(
            regexp = "^(\\+91|91)?[5-9]\\d{9}$",
            message = "Invalid Indian mobile number"
    )
    private String mobile;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 20, message = "Password must be between {max} and {min} characters")
    private String password;

    @NotBlank(message = "Name is required")
    private String f_name;

    private String l_name;
}
