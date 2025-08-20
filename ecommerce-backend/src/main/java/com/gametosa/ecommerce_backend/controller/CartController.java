package com.gametosa.ecommerce_backend.controller;

import com.gametosa.ecommerce_backend.domain.dto.request.AddToCartRequest;
import com.gametosa.ecommerce_backend.domain.dto.response.CartResponseDto;
import com.gametosa.ecommerce_backend.domain.entities.Cart;
import com.gametosa.ecommerce_backend.mapper.CartMapper;
import com.gametosa.ecommerce_backend.service.CartService;
import com.twilio.http.Response;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customer/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final CartMapper cartMapper;

    @PutMapping(path = "/add")
    public ResponseEntity<CartResponseDto> addToCart(
            @RequestAttribute UUID userId,
            @RequestBody AddToCartRequest request
    ) {
        Cart cart = cartService.addToCart(userId, request);
        CartResponseDto response = cartMapper.toCartResponseDto(cart);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CartResponseDto> viewCart(@RequestAttribute UUID userId) {
        Cart cart = cartService.viewUserCart(userId);
        CartResponseDto response = cartMapper.toCartResponseDto(cart);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping(path = "/remove")
    public ResponseEntity<CartResponseDto> removeFromCart(
            @RequestAttribute UUID userId,
            @RequestParam UUID productId
    ) {
        Cart cart = cartService.removeProductFromCart(userId, productId);
        CartResponseDto response = cartMapper.toCartResponseDto(cart);
        return ResponseEntity.ok(response);
    }

    // Create Order Class and OrderItem Class
    @PostMapping(path = "/checkout")
    public ResponseEntity<?> checkout(@RequestAttribute UUID userId) {
        return ResponseEntity.noContent().build();
    }
}
