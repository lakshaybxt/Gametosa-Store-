package com.gametosa.ecommerce_backend.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserDto {

    @NotBlank(message = "User mobile number is required")
    @Pattern(
            regexp = "^(\\+91|91)?[5-9]\\d{9}$",
            message = "Invalid Indian mobile number"
    )
    private String mobile;
    @NotBlank(message = "Verification code is required")
    private String verificationCode;
}
