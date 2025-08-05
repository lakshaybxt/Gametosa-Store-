package com.gametosa.ecommerce_backend.exceptions;

public class ProductAlreadyExistException extends BaseException {
    public ProductAlreadyExistException() {
    }

    public ProductAlreadyExistException(String message) {
        super(message);
    }

    public ProductAlreadyExistException(Throwable cause) {
        super(cause);
    }

    public ProductAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
