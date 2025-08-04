package com.gametosa.ecommerce_backend.exceptions;

public class CategoryAlreadyExistException extends BaseException {
    public CategoryAlreadyExistException() {
    }

    public CategoryAlreadyExistException(String message) {
        super(message);
    }

    public CategoryAlreadyExistException(Throwable cause) {
        super(cause);
    }

    public CategoryAlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
