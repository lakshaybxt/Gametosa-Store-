package com.gametosa.ecommerce_backend.exceptions;

public class BrandAlreadyExistException extends BaseException {
    public BrandAlreadyExistException() {
    }

    public BrandAlreadyExistException(String message) {
        super(message);
    }

    public BrandAlreadyExistException(Throwable cause) {
        super(cause);
    }

    public BrandAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
