package com.gametosa.ecommerce_backend.domain.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CancelOrderItemRequest {

    @NotNull
    private UUID orderItemId;

    @NotBlank
    private String reason;

    private Boolean requestRefund = true;
}
