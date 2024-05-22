package psi.projekt.hotel.config;

import jakarta.validation.ConstraintViolation;
import lombok.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ObjectExistInDBException.class)
    public ExceptionRestResponse handleObjectExistInDBException(ObjectExistInDBException ex) {
        return new ExceptionRestResponse(500, ex.getMessage());
    }

    @Value
    public static class ExceptionRestResponse {
        int code;
        String message;
    }
}