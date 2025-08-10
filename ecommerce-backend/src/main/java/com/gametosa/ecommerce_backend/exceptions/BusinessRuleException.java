package com.gametosa.ecommerce_backend.exceptions;

public class BusinessRuleException extends BaseException {
    public BusinessRuleException() {
    }

    public BusinessRuleException(String message) {
        super(message);
    }

    public BusinessRuleException(Throwable cause) {
        super(cause);
    }

    public BusinessRuleException(String message, Throwable cause) {
        super(message, cause);
    }
}
