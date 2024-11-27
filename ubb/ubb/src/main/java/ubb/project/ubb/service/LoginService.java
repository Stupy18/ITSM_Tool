package ubb.project.ubb.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ubb.project.ubb.config.ITSMUserDetails;
import ubb.project.ubb.data.Role;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.exception.NotMatchException;
import ubb.project.ubb.repository.IUserRepository;

import java.util.HashSet;
import java.util.List;

@Service
public class LoginService {
    private final IUserRepository repository;

    private final AuthenticationManager authenticationManager;

    public LoginService(IUserRepository repository, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
    }

    public LoginResponseDto loginResponse(LoginRequestDto requestDto) throws NotMatchException, NotExistsException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDto.getEmail(),
                        requestDto.getPassword()
                )
        );

        ITSMUserDetails user = (ITSMUserDetails) authentication.getPrincipal();

        return new LoginResponseDto(
                user.getUser().getId(),
                user.getUser().getEmail(),
                user.getUser().getName(),
                user.getUser().getRoles().stream().map(Role::getId).toList()
        );
    }
}
