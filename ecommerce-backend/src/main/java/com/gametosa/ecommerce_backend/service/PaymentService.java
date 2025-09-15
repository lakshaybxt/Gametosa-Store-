package com.gametosa.ecommerce_backend.service;

import com.gametosa.ecommerce_backend.domain.entities.Order;
import com.razorpay.RazorpayException;

public interface PaymentService {
    String createRazorpayOrder(Order order) throws RazorpayException;
}
