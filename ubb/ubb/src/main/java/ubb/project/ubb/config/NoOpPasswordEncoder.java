package ubb.project.ubb.config;

import org.springframework.security.crypto.password.PasswordEncoder;

public class NoOpPasswordEncoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        // Simply return the raw password as-is without encoding
        return rawPassword.toString();
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        // Check if the raw password matches the encoded password (which is just the raw password)
        return rawPassword.toString().equals(encodedPassword);
    }
}