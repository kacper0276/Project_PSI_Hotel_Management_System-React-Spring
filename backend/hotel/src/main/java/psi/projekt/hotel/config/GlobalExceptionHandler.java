package psi.projekt.hotel.config;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.Value;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import psi.projekt.hotel.exceptions.ObjectExistInDBException;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ObjectExistInDBException.class)
    public ExceptionRestResponse handleObjectExistInDBException(ObjectExistInDBException ex) {
        return new ExceptionRestResponse(500, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ExceptionRestResponse handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        return new ExceptionRestResponse(500, errors.getFirst());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ExceptionRestResponse handleConstraintViolationExceptions(ConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getMessage());
        }
        return new ExceptionRestResponse(500, errors.getFirst());
    }

    @Value
    public static class ExceptionRestResponse {
        int code;
        String message;
    }
}