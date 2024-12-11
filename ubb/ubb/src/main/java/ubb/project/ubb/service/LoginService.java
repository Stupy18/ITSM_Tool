package ubb.project.ubb.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Role;
import ubb.project.ubb.data.RoleEnum;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.exception.NotMatchException;
import ubb.project.ubb.repository.IUserRepository;

@Service
public class LoginService {
    private final IUserRepository repository;

    private final AuthenticationManager authenticationManager;

    public LoginService(IUserRepository repository, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
    }

    public LoginResponseDto loginResponse(LoginRequestDto requestDto) throws NotMatchException, NotExistsException {
        return authenticate(requestDto.getEmail(), requestDto.getPassword());
    }

    public LoginResponseDto loginResponseGuest(Long id) throws IllegalArgumentException
    {
        User user = repository.findById(id).orElse(null);

        if(user == null || user.getRoles().stream().noneMatch((x)->x.getRoleName() == RoleEnum.GUEST))
            throw new IllegalArgumentException("User doesn't exist or is not a guest.");

        return authenticate(user.getEmail(), user.getPassword());
    }

    private LoginResponseDto authenticate(String email, String password)
    {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        password
                )
        );

        User user = (User) authentication.getPrincipal();

        return new LoginResponseDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRoles().stream().map(Role::getId).toList()
        );
    }
}
