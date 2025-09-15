package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.account.secret}")
    private String key;

    @Value("${razorpay.account.key}")
    private String secret;

    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;

    @Override
    public String createRazorpayOrder(com.gametosa.ecommerce_backend.domain.entities.Order order) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(key, secret);

        JSONObject options = new JSONObject();
        options.put("amount", order.getFinalPrice().multiply(BigDecimal.valueOf(100)));
        options.put("currency", "INR");
        options.put("receipt", "order_" + System.currentTimeMillis());

        Order razorpayOrder = client.orders.create(options);
        return razorpayOrder.toString();
    }
}
