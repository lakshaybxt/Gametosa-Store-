package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.domain.AddressSnap;
import com.gametosa.ecommerce_backend.domain.dto.request.CancelOrderItemRequest;
import com.gametosa.ecommerce_backend.domain.entities.*;
import com.gametosa.ecommerce_backend.domain.OrderStatus;
import com.gametosa.ecommerce_backend.domain.PaymentMethod;
import com.gametosa.ecommerce_backend.domain.PaymentStatus;
import com.gametosa.ecommerce_backend.domain.dto.request.CheckoutRequest;
import com.gametosa.ecommerce_backend.exceptions.EmptyCartException;
import com.gametosa.ecommerce_backend.exceptions.InsufficientStockException;
import com.gametosa.ecommerce_backend.repository.*;
import com.gametosa.ecommerce_backend.service.CartService;
import com.gametosa.ecommerce_backend.service.EmailService;
import com.gametosa.ecommerce_backend.service.OrderService;
import com.gametosa.ecommerce_backend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserService userService;
    private final CartService cartService;
    private final EmailService emailService;

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    @Transactional
    public Order checkout(UUID userId, CheckoutRequest request) {
        User cartUser = userService.getUserById(userId);
        Cart cart = cartService.viewUserCart(userId);
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new EntityNotFoundException("AddressSnap not found with the following Id"));


        if(cart.getCartItems().isEmpty()) {
            throw new EmptyCartException("Cart is empty. Add items before checkout");
        }

        for(CartItem cartItem : cart.getCartItems()) {
            Product product = cartItem.getProduct();

            if(product.getStackQuantity() < cartItem.getQuantity())
                throw new InsufficientStockException("Insufficient stocks for product " + product.getName());

            product.setStackQuantity(product.getStackQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        List<OrderItem> orderItems = cart.getCartItems().stream()
                .map(cartItem -> OrderItem.builder()
                        .product(cartItem.getProduct())
                        .priceAtPurchase(cartItem.getProduct().getDiscountedPrice())
                        .quantity(cartItem.getQuantity())
                        .orderStatus(OrderStatus.PLACED)
                        .purchasedAt(LocalDateTime.now())
                        .build())
                .toList();

        AddressSnap addressSnap = AddressSnap.builder()
                .fullName(cartUser.getF_name() + " " + cartUser.getL_name())
                .streetNo(address.getStreetNo())
                .houseNo(address.getHouseNo())
                .area(address.getArea())
                .city(address.getCity())
                .state(address.getState())
                .postalCode(address.getPostalCode())
                .country(address.getCountry())
                .phoneNo(cartUser.getMobileNumber())
                .build();

        BigDecimal finalPrice = orderItems.stream()
                .map(orderItem -> orderItem.getPriceAtPurchase().multiply(
                        BigDecimal.valueOf(orderItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // TODO: Need to implement a function. If a user want to pay through RazorPay which set its Payment paid
        // If uses UPI or Card

        PaymentStatus status = PaymentStatus.PENDING;

        Order order = Order.builder()
                .user(cartUser)
                .orderStatus(OrderStatus.PLACED)
                .paymentStatus(status)
                .paymentMethod(request.getPaymentMethod())
                .finalPrice(finalPrice)
                .orderItems(orderItems)
                .shippingAddress(addressSnap)
                .build();

        order.getOrderItems().forEach(orderItem -> orderItem.setOrder(order));

        Order savedOrder = orderRepository.save(order);

        cart.getCartItems().clear();
        cartRepository.save(cart);

        sendOrderConfirmationEmail(savedOrder);

        return savedOrder;
    }

    @Override
    public Order cancelOrderRequest(UUID userId, CancelOrderItemRequest request) {
        OrderItem item = orderItemRepository.findById(request.getOrderItemId())
                .orElseThrow(() -> new EntityNotFoundException("Order Item not found with the following id: " + request.getOrderItemId()));

        Order order = item.getOrder();

        if(!order.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You are not authorized to cancel this item");
        }

        // Validate cancellation if the time is up or order is shipped or one step ahead of it we will not cancel
        validateCancellationRequest(item, order);

        // TODO: If user paid via Paypal or something. A function will refund the user Amount

        item.setOrderStatus(OrderStatus.CANCELLED);
        item.setCancelledAt(LocalDateTime.now());
//        item.setCancellationReason(request.getReason());
//        item.setRefundStatus(request.getRequestRefund() ? RefundStatus.PENDING : RefundStatus.NOT_APPLICABLE);

        OrderItem savedOrderItem = orderItemRepository.save(item);

        restoreInventory(orderItem);


        Order updatedOrder = updateOrderAfterItemCancellation(order);

        // TODO: Also should add a List off Something in User Entity. Somenthing for Analytics

        emailService.sendItemCancellationEmail(updatedOrder, savedOrderItem)

        return null;
    }

    private void sendOrderConfirmationEmail(Order savedOrder) {
        String subject = "🎮 Target Acquired: Your GAMETOSA Gaming Gear Order is Confirmed!\";\n #" + savedOrder.getId() + " is Confirmed 🚀";

        String orderNumber = "「 " + savedOrder.getId()+ " 」";
        String playerName = savedOrder.getUser().getF_name() + " " + savedOrder.getUser().getL_name();
        String totalAmount = "₹" + savedOrder.getFinalPrice();
        int maxDeliveryDays = savedOrder.getOrderItems().stream()
                .mapToInt(item -> item.getProduct().getDeliveryDays())
                .max()
                .orElse(7);
        String deliveryDate = LocalDateTime.now()
                .plusDays(maxDeliveryDays)
                .format(DateTimeFormatter.ofPattern("MMM dd"));
        String paymentMethod = savedOrder.getPaymentMethod().toString();

        String htmlMessage = "<html>" +
                "<body style='font-family: \"Orbitron\", \"Segoe UI\", sans-serif; background-color: #0a0a0a; color: #f0f0f0; margin: 0; padding: 0;'>" +
                "<div style='max-width: 650px; margin: auto; padding: 30px; " +
                "background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460); border-radius: 12px; " +
                "box-shadow: 0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(106,17,203,0.3); text-align: center;'>" +

                "<h2 style='color: #00ffff; font-size: 28px; margin-bottom: 10px; text-shadow: 0 0 10px #00ffff;'>🏆 ACHIEVEMENT UNLOCKED 🏆</h2>" +
                "<p style='font-size: 18px; color: #ffffff; font-weight: 600;'>Mission Complete, " + playerName + "!</p>" +
                "<p style='font-size: 16px; color: #dcdcdc;'>Your gaming arsenal has been secured. Prepare for legendary battles ahead!</p>" +

                "<div style='margin: 25px 0; padding: 25px; background-color: #141414; " +
                "border: 3px solid #6a11cb; border-radius: 10px; position: relative; overflow: hidden;'>" +
                "<h3 style='margin: 0; color: #ffffff; font-size: 18px;'>⚡ Order ID:</h3>" +
                "<p style='font-size: 24px; font-weight: bold; color: #00ff88; margin-top: 12px; letter-spacing: 2px; text-shadow: 0 0 10px #00ff88;'>"
                + orderNumber + "</p>" +
                "</div>" +

                "<div style='display: flex; justify-content: space-around; margin: 25px 0; flex-wrap: wrap;'>" +
                "<div style='background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 5px; border-left: 3px solid #00ffff; min-width: 120px;'>" +
                "<div style='font-size: 12px; color: #cccccc; text-transform: uppercase;'>TOTAL DAMAGE</div>" +
                "<div style='font-size: 20px; font-weight: bold; color: #00ff88;'>" + totalAmount + "</div>" +
                "</div>" +
                "<div style='background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 5px; border-left: 3px solid #ff6b35; min-width: 120px;'>" +
                "<div style='font-size: 12px; color: #cccccc; text-transform: uppercase;'>PAYMENT MODE</div>" +
                "<div style='font-size: 16px; font-weight: bold; color: #ffffff;'>" + paymentMethod + "</div>" +
                "</div>" +
                "<div style='background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin: 5px; border-left: 3px solid #2575fc; min-width: 120px;'>" +
                "<div style='font-size: 12px; color: #cccccc; text-transform: uppercase;'>ETA DELIVERY</div>" +
                "<div style='font-size: 16px; font-weight: bold; color: #ffffff;'>" + deliveryDate + "</div>" +
                "</div>" +
                "</div>" +

                "<div style='margin: 20px 0;'>" +
                "<span style='display: inline-block; background: linear-gradient(135deg, #00ff88, #00cc70); color: #000000; " +
                "padding: 12px 25px; border-radius: 25px; font-weight: 700; text-transform: uppercase; " +
                "letter-spacing: 1px; box-shadow: 0 5px 15px rgba(0,255,136,0.3);'>🚀 ORDER CONFIRMED</span>" +
                "</div>" +

                "<div style='margin: 30px 0;'>" +
                "<a href='https://gametosa.com/track-order/" + savedOrder.getId() + "' " +
                "style='display: inline-block; background: linear-gradient(135deg, #6a11cb, #2575fc); color: #ffffff; " +
                "padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: 600; " +
                "text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 8px 20px rgba(106,17,203,0.4); " +
                "transition: all 0.3s ease;'>📱 TRACK YOUR ORDER</a>" +
                "</div>" +

                "<p style='font-size: 14px; color: #999; margin-top: 25px;'>Need support? Our gaming support squad is ready to assist you 24/7 🎧</p>" +
                "<p style='font-size: 14px; color: #999;'>Game on and dominate the battlefield!<br/>– Team GAMETOSA 🎮</p>" +

                "</div>" +
                "</body>" +
                "</html>";

        try {
            emailService.sendVerificationEmail(savedOrder.getUser().getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
