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


    ///SPRING SECURITY STUFF, WILL BE USEFUL LATER ON
//    public Authentication getAuthentication(final HttpServletRequest request) {
//        Authentication auth = null;
//        final String token = request.getHeader(HEADER_STRING);
//        try{
//            if(token != null && !token.isEmpty()){
//                Jws<Claims> claims;
//                claims = Jwts.parserBuilder().setSigningKey(getSigningKey())
//                        .build()
//                        .parseClaimsJws(token);
//                if(claims != null){
//                    final String id = Optional.ofNullable(claims.getBody().get(CLAIM_ID)).map(Object::toString)
//                            .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("No id in jwt"));
//                    final String username = Optional.ofNullable(claims.getBody().get(CLAIM_USER)).map(Object::toString)
//                            .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("No username in jwt"));
//                    String role = Optional.ofNullable(claims.getBody().get(CLAIM_ROLE)).map(Object::toString)
//                            .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("No roles in jwt"));
//                    final String email = Optional.ofNullable(claims.getBody().get(CLAIM_EMAIL)).map(Object::toString)
//                            .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("No email in jwt"));
//
//                    Long newId = Long.parseLong(id);
//                    role = role.replaceAll("\\[|\\]", "");
//                    List<Long> roles = Arrays.asList(role.split(",")).stream().map((String pre_role)->{return Long.parseLong(pre_role);}).toList();
//
//                    //Spring Security stuff
//                    //ArrayList<GrantedAuthority> authorities = new ArrayList<>();
//                    //authorities.add(new SimpleGrantedAuthority(roles));
//                    auth = new UsernamePasswordAuthenticationToken(new LoginResponseDto(newId,email, username, roles), null, null);
//                }
//            }
//        }catch (final MalformedJwtException | UnsupportedJwtException ex) {
//            log.error("Unsupported jwt token {} with exception {}",
//                    token,
//                    ex.getMessage());
//            throw new JwtAuthenticationException(ex);
//        } catch (final ExpiredJwtException ex) {
//            log.error("Expired jwt token {}",
//                    ex.getMessage());
//            throw new JwtAuthenticationException(ex);
//        } catch (final AuthenticationCredentialsNotFoundException ex) {
//            log.error("An error occured while trying to create authentication based on jwt token, missing credentials {}",
//                    ex.getMessage());
//            throw new JwtAuthenticationException(ex);
//        } catch (final Exception ex) {
//            log.error("Unexpected exception occured while parsing jwt {} exception: {}",
//                    token,
//                    ex.getMessage());
//            throw new JwtAuthenticationException(ex);
//        }
//
//        log.debug("The authentication constructed by the JwtService");
//        return auth;
//    }

}
