package com.gametosa.ecommerce_backend.exceptions;

public class UserAlreadyExistsException extends BaseException {
  public UserAlreadyExistsException() {
  }

  public UserAlreadyExistsException(String message) {
    super(message);
  }

  public UserAlreadyExistsException(String message, Throwable cause) {
    super(message, cause);
  }

  public UserAlreadyExistsException(Throwable cause) {
    super(cause);
  }
}
