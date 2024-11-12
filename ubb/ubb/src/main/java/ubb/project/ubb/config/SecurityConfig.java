package ubb.project.ubb.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {


    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request.requestMatchers(antMatcher(HttpMethod.OPTIONS)).permitAll()
                        .requestMatchers(antMatcher("/login")).permitAll()
                        .requestMatchers(antMatcher("/register")).permitAll()
                        .requestMatchers(antMatcher("/company/register")).authenticated()
                        .requestMatchers(antMatcher("/login/healthcheck")).authenticated()
                        .requestMatchers(antMatcher("/socket/**")).authenticated()
                        .requestMatchers("/email/to/**").authenticated()
                        .requestMatchers("/files/upload").authenticated()
                        .requestMatchers("/files/download/**").authenticated())

                .authorizeHttpRequests(request -> request.requestMatchers(antMatcher("/**")).authenticated())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        ;
        return http.build();
    }


}

