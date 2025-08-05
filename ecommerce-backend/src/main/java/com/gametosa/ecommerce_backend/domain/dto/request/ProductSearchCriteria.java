package com.gametosa.ecommerce_backend.domain.dto.request;

import lombok.*;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSearchCriteria {
    String keyword;
    String categoryId;
    String brandId;
    BigDecimal minPrice;
    BigDecimal maxPrice;
    List<String> tags;
    boolean inStockOnly;
}
