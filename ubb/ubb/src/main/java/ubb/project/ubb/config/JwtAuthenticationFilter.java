package ubb.project.ubb.config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;

    public JwtAuthenticationFilter(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String token = parseJwt(request);  // Extract JWT from the request
        if (token != null) {
            try {
                // Parse the claims and extract role information
                Claims claims = Jwts.parser()
                        .setSigningKey(jwtTokenService.getSigningKey())  // Get signing key from JwtTokenService
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                // Extract user information
                String username = claims.get("user", String.class);
                List<GrantedAuthority> authorities = Arrays.stream(claims.get("role", String[].class))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                // Create an Authentication object
                Authentication auth = new UsernamePasswordAuthenticationToken(username, null, authorities);

                // Set the authentication context
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception e) {
                // Handle any parsing or validation errors
                SecurityContextHolder.clearContext();
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is not valid");
                return;
            }
        }

        filterChain.doFilter(request, response);  // Continue the filter chain
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("app-auth"); // "app-auth" header
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Extract the token part after "Bearer "
        }
        return null;
    }
}
