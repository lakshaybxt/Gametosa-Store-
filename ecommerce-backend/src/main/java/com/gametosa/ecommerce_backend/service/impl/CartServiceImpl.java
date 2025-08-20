package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.dto.request.AddToCartRequest;
import com.gametosa.ecommerce_backend.domain.entities.Cart;
import com.gametosa.ecommerce_backend.domain.entities.CartItem;
import com.gametosa.ecommerce_backend.domain.entities.Product;
import com.gametosa.ecommerce_backend.domain.entities.User;
import com.gametosa.ecommerce_backend.repository.CartRepository;
import com.gametosa.ecommerce_backend.repository.UserRepository;
import com.gametosa.ecommerce_backend.service.CartService;
import com.gametosa.ecommerce_backend.service.ProductService;
import com.gametosa.ecommerce_backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final ProductService productService;

    @Override
    @Transactional
    public Cart addToCart(UUID userId, AddToCartRequest request) {
        User existingUser = userService.getUserById(userId);
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;

        if(optionalCart.isEmpty()) {
            cart = Cart.builder()
                .user(existingUser)
                .cartItems(new ArrayList<>())
                .build();

            cart = cartRepository.save(cart);

            existingUser.setCart(cart);
            userRepository.save(existingUser);
        } else {
            cart = optionalCart.get();
        }

        Product product = productService.getProductById(request.getProductId());

        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();

        if(existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cart.getCartItems().add(cartItem);
        }

        return cartRepository.save(cart);
    }

    @Override
    @Transactional
    public Cart viewUserCart(UUID userId) {
        User user = userService.getUserById(userId);
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        if(optionalCart.isPresent()) {
            return optionalCart.get();
        }

        Cart cart = Cart.builder()
                .user(user)
                .cartItems(new ArrayList<>())
                .build();
        cart = cartRepository.save(cart);

        user.setCart(cart);
        userRepository.save(user);

        return cart;
    }

    public Cart getCartByUserId(UUID userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Cart not found with user id: " + userId));
    }

    @Override
    public Cart removeProductFromCart(UUID userId, UUID productId) {
        Cart cart = getCartByUserId(userId);

        boolean removed = cart.getCartItems().removeIf(item ->
                item.getProduct().getId().equals(productId));

        if (!removed) {
            throw new EntityNotFoundException("Product not found in cart");
        }

        return cartRepository.save(cart);
    }
}
