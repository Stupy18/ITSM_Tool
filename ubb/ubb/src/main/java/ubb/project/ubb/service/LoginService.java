package ubb.project.ubb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.LoginRequestDto;
import ubb.project.ubb.dto.LoginResponseDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.exception.NotMatchException;
import ubb.project.ubb.repository.IUserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoginService {

    private final IUserRepository userRepository;

    @Autowired
    public LoginService(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponseDto loginResponse(LoginRequestDto requestDto) throws NotExistsException, NotMatchException {
        // Fetch user by email
        User user = userRepository.findByEmail(requestDto.getEmail());
        if (user == null) {
            throw new NotExistsException("User not found with email: " + requestDto.getEmail());
        }

        // Check if password matches
        if (!user.getPassword().equals(requestDto.getPassword())) {
            throw new NotMatchException("Incorrect password.");
        }

        // Map user to response DTO
        LoginResponseDto responseDto = new LoginResponseDto();
        responseDto.setId(user.getId());
        responseDto.setUsername(user.getName());
        responseDto.setEmail(user.getEmail());

        // Populate role IDs
        responseDto.setRoleIds(user.getRoles().stream()
                .map(role -> role.getRoleName()) // Assuming role IDs are required
                .collect(Collectors.toList()));

        return responseDto;
    }
}
