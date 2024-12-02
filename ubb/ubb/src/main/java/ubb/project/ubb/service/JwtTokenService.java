package ubb.project.ubb.service;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ubb.project.ubb.config.ITSMUserDetails;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.Date;

@Service
@Slf4j
public class JwtTokenService {
    private static final long EXPIRATIONTIME = Duration.ofDays(1).toMillis();
    private static final String HEADER_STRING = "app-auth";

    private static final String CLAIM_ID = "id";
    private static final String CLAIM_USER = "user";
    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_ROLE = "role";

    @Value("${application.secret}")
    private String secret;


    public String createJwtToken(LoginResponseDto loginResponseDto) {
        return Jwts.builder()
                .subject(String.valueOf(loginResponseDto.getId()))
                .claim(CLAIM_EMAIL, loginResponseDto.getEmail())
                .claim(CLAIM_ROLE, loginResponseDto.getRoleIds())
                .claim(CLAIM_USER, loginResponseDto.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(getSigningKey())
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get(CLAIM_EMAIL)
                .toString();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }




}
