package ubb.project.ubb.exception;

public class JwtAuthenticationException extends RuntimeException{
    public JwtAuthenticationException(final Exception ex) {
        super(ex);
    }
}
