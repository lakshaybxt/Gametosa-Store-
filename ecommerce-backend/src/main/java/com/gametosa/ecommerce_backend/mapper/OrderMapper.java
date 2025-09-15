package com.gametosa.ecommerce_backend.mapper;

import com.gametosa.ecommerce_backend.domain.AddressSnap;
import com.gametosa.ecommerce_backend.domain.dto.AddressDto;
import com.gametosa.ecommerce_backend.domain.dto.response.OrderItemResponseDto;
import com.gametosa.ecommerce_backend.domain.dto.response.OrderResponseDto;
import com.gametosa.ecommerce_backend.domain.entities.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderMapper {
    public OrderResponseDto toOrderResponseDto(Order order) {
        List<OrderItemResponseDto> items = order.getOrderItems().stream()
                .map(orderItem -> OrderItemResponseDto.builder()
                        .productName(orderItem.getProduct().getName())
                        .productId(orderItem.getProduct().getId())
                        .priceAtPurchase(orderItem.getPriceAtPurchase())
                        .quantity(orderItem.getQuantity())
                        .build())
                .toList();

        AddressSnap address = order.getShippingAddress();
        AddressDto addressDto = AddressDto.builder()
                .area(address.getArea())
                .city(address.getCity())
                .state(address.getState())
                .postalCode(address.getPostalCode())
                .houseNo(address.getHouseNo())
                .streetNo(address.getStreetNo())
                .country(address.getCountry())
                .build();

        return OrderResponseDto.builder()
                .orderId(order.getId())
                .orderStatus(order.getOrderStatus())
                .paymentMethod(order.getPaymentMethod())
                .paymentStatus(order.getPaymentStatus())
                .finalPrice(order.getFinalPrice())
                .createdAt(order.getCreatedAt())
                .shippingAddress(addressDto)
                .orderItems(items)
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
