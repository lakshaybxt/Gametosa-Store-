package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.request.CancelOrderItemRequest;
import com.gametosa.ecommerce_backend.domain.dto.response.OrderResponseDto;
import com.gametosa.ecommerce_backend.domain.entities.Order;
import com.gametosa.ecommerce_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/order")
@RequiredArgsConstructor
public class OrderController {

    // endpoint for update order shipping status and also for Payment success
    private final OrderService orderService;

    @PutMapping(path = "/cancel")
    public ResponseEntity<OrderResponseDto> cancelOrder(
            @RequestAttribute UUID userId,
            @RequestBody CancelOrderItemRequest request
    ) {
        Order order = orderService.cancelOrderRequest(userId, request);
    }
}
