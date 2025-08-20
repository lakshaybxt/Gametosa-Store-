package com.gametosa.ecommerce_backend.mapper;

import com.gametosa.ecommerce_backend.domain.dto.response.CartItemResponseDTO;
import com.gametosa.ecommerce_backend.domain.dto.response.CartResponseDto;
import com.gametosa.ecommerce_backend.domain.entities.Cart;
import com.gametosa.ecommerce_backend.domain.entities.CartItem;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class CartMapper {

    public CartResponseDto toCartResponseDto(Cart cart) {
        if(cart == null) {
            return CartResponseDto.builder()
                    .items(List.of())
                    .totalItems(0)
                    .totalOriginalAmount(BigDecimal.ZERO)
                    .totalDiscountedAmount(BigDecimal.ZERO)
                    .totalAmount(BigDecimal.ZERO)
                    .build();
        }

        List<CartItemResponseDTO> items = cart.getCartItems().stream()
                .map(this::toCartItemResponseDto)
                .toList();

        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        BigDecimal totalOriginalAmount = cart.getCartItems().stream()
                .map(item -> item.getProduct().getOriginalPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalAmount = cart.getCartItems().stream()
                .map(item -> item.getProduct().getDiscountedPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalDiscountedAmount = totalOriginalAmount.subtract(totalAmount);


        return CartResponseDto.builder()
                .id(cart.getId())
                .items(items)
                .totalItems(totalItems)
                .totalOriginalAmount(totalOriginalAmount)
                .totalDiscountedAmount(totalDiscountedAmount)
                .totalAmount(totalAmount)
                .build();
    }

    private CartItemResponseDTO toCartItemResponseDto(CartItem cartItem) {
        var product = cartItem.getProduct();

        return CartItemResponseDTO.builder()
                .cartItemId(cartItem.getId())
                .productId(product.getId())
                .productName(product.getName())
                .shortDescription(product.getShortDescription())
                .originalPrice(product.getOriginalPrice())
                .discountedPrice(product.getDiscountedPrice())
                .discount(product.getDiscount())
                .imageUrls(product.getImageUrls())
                .brand(product.getBrand() != null ? product.getBrand().getName() : null)
                .category(product.getCategory() != null ? product.getCategory().getName() : null)
                .quantity(cartItem.getQuantity())
                .itemTotal(product.getDiscountedPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                .inStock(product.isInStock())
                .sku(product.getSku())
                .color(product.getColor())
                .size(product.getSize())
                .build();
    }
}

