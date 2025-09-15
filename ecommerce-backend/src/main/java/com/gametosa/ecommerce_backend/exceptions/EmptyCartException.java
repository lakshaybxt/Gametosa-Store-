package com.gametosa.ecommerce_backend.exceptions;

public class EmptyCartException extends BaseException{
    public EmptyCartException() {
    }

    public EmptyCartException(String message) {
        super(message);
    }

    public EmptyCartException(Throwable cause) {
        super(cause);
    }

    public EmptyCartException(String message, Throwable cause) {
        super(message, cause);
    }
}
