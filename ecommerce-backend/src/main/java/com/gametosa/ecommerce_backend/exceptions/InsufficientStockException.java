package com.gametosa.ecommerce_backend.exceptions;

public class InsufficientStockException extends BaseException {
    public InsufficientStockException() {
    }

    public InsufficientStockException(String message) {
        super(message);
    }

    public InsufficientStockException(Throwable cause) {
        super(cause);
    }

    public InsufficientStockException(String message, Throwable cause) {
        super(message, cause);
    }
}
