package ubb.project.ubb.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {


    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request.requestMatchers(antMatcher(HttpMethod.OPTIONS)).permitAll()
                        .requestMatchers(antMatcher("/login")).permitAll()
                        .requestMatchers(antMatcher("/register")).permitAll()
                        .requestMatchers(antMatcher("/company/register")).permitAll()
                        .requestMatchers(antMatcher("/login/healthcheck")).permitAll()
                        .requestMatchers(antMatcher("/socket/**")).permitAll()
                        .requestMatchers("/email/to/**").permitAll()
                        .requestMatchers("/files/upload").permitAll()
                        .requestMatchers("/bugticket/**").permitAll()
                        .requestMatchers("/files/download/**").permitAll())

                .authorizeHttpRequests(request -> request.requestMatchers(antMatcher("/**")).authenticated())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        ;
        return http.build();
    }


}

