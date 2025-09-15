package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.dto.request.CancelOrderItemRequest;
import com.gametosa.ecommerce_backend.domain.dto.request.CheckoutRequest;
import com.gametosa.ecommerce_backend.domain.entities.Order;
import jakarta.validation.Valid;

import java.util.UUID;

public interface OrderService {
    Order checkout(UUID userId, CheckoutRequest request);
    Order cancelOrderRequest(UUID userId, CancelOrderItemRequest request);
}
