package com.excelr.jobportal.exception;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  ApiError notFound(ResourceNotFoundException error) { return ApiError.of(404, error.getMessage()); }

  @ExceptionHandler({IllegalArgumentException.class, DataIntegrityViolationException.class})
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  ApiError badRequest(Exception error) {
    String message = error instanceof DataIntegrityViolationException ? "A record with that unique value already exists" : error.getMessage();
    return ApiError.of(400, message);
  }

  @ExceptionHandler(AuthenticationException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  ApiError unauthorized() { return ApiError.of(401, "Email or password is incorrect"); }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  ApiError validation(MethodArgumentNotValidException error) {
    Map<String, String> fields = new LinkedHashMap<>();
    error.getBindingResult().getFieldErrors().forEach(field -> fields.putIfAbsent(field.getField(), field.getDefaultMessage()));
    return new ApiError(Instant.now(), 400, "Validation failed", fields);
  }

  record ApiError(Instant timestamp, int status, String message, Map<String, String> fieldErrors) {
    static ApiError of(int status, String message) { return new ApiError(Instant.now(), status, message, Map.of()); }
  }
}
