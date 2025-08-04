package com.gametosa.ecommerce_backend.service.impl;

import com.gametosa.ecommerce_backend.repository.ProductRepository;
import com.gametosa.ecommerce_backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
}
