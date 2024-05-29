package psi.projekt.hotel.exceptions;

public class ObjectNotExistInDBException extends RuntimeException{
    public ObjectNotExistInDBException() {
    }

    public ObjectNotExistInDBException(String message) {
        super(message);
    }

    public ObjectNotExistInDBException(String message, Throwable cause) {
        super(message, cause);
    }

    public ObjectNotExistInDBException(Throwable cause) {
        super(cause);
    }
}
