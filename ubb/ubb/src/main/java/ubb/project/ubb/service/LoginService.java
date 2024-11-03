package ubb.project.ubb.service;

import org.springframework.stereotype.Service;
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

    public LoginService(IUserRepository repository) {
        this.repository = repository;
    }

    public LoginResponseDto loginResponse(LoginRequestDto requestDto) throws NotMatchException, NotExistsException {
        User user = this.repository.findUserByEmail(requestDto.getEmail());
        if(user != null){
            if(user.getPassword().equals(requestDto.getPassword())){
                return new LoginResponseDto(user.getId(), user.getEmail(), user.getName(), user.getRoles().stream().map((Role role)->{return role.getId();}).toList());
            }
            throw new NotMatchException("Password doesn't match");
        }
        else{
            throw new NotExistsException("Email doesn't exist");
        }
    }
}
