package com.gametosa.ecommerce_backend.domain.dto.request;

import com.gametosa.ecommerce_backend.domain.PaymentMethod;
import com.gametosa.ecommerce_backend.domain.dto.AddressDto;
import com.gametosa.ecommerce_backend.domain.entities.Address;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckoutRequest {
    @NotNull(message = "AddressSnap Required")
    private UUID addressId; // Before checkout one API will call the user addresses and from this it will pass the uuid of the address

    @NotNull(message = "Payment Method need to be selected")
    private PaymentMethod paymentMethod;

    private String couponCode;
}
