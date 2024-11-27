package ubb.project.ubb.service;

import org.springframework.stereotype.Service;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.EmailInUseException;
import ubb.project.ubb.exception.EmailInvalidException;
import ubb.project.ubb.exception.NameInvalidException;
import ubb.project.ubb.exception.PasswordInvalidException;
import ubb.project.ubb.repository.IUserRepository;

import java.util.regex.Pattern;

@Service
public class UserRegistrationService {

    private final IUserRepository userRepository;

    public UserRegistrationService(IUserRepository userRepository) { this.userRepository = userRepository; }

    public void registerUser(UserRegistrationDto userDto) throws EmailInUseException, PasswordInvalidException, EmailInvalidException, NameInvalidException
    {
        if(userDto.getName().isEmpty())
            throw new NameInvalidException("Name is empty");

        if(userRepository.findUserByEmail(userDto.getEmail()).isPresent())
            throw new EmailInUseException("Email address is already in use.");

        if(userDto.getEmail().isEmpty() || !Pattern.matches(".*@.*\\..*", userDto.getEmail()))
            throw new EmailInvalidException("Invalid email address provided.");

        if(userDto.getPassword().length() < 6)
            throw new PasswordInvalidException("Password must contain at least 6 characters.");

        User user = new User();

        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setName(userDto.getName());

        // roles not defined yet

        //user.getRoles().add(admin);

        userRepository.save(user);
    }

}
