package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.request.AddToCartRequest;
import com.gametosa.ecommerce_backend.domain.entities.Cart;

import java.util.UUID;

public interface CartService {
    Cart addToCart(UUID userId, AddToCartRequest request);
    Cart viewUserCart(UUID userId);
    Cart removeProductFromCart(UUID userId, UUID productId);
}
