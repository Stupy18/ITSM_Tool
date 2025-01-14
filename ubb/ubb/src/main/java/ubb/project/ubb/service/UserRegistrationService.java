package ubb.project.ubb.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Role;
import ubb.project.ubb.data.RoleEnum;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.EmailInUseException;
import ubb.project.ubb.exception.EmailInvalidException;
import ubb.project.ubb.exception.NameInvalidException;
import ubb.project.ubb.exception.PasswordInvalidException;
import ubb.project.ubb.repository.IRoleRepository;
import ubb.project.ubb.repository.IUserRepository;

import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class UserRegistrationService {

    private final IUserRepository userRepository;
    private final IRoleRepository roleRepository;

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

    public void registerGuest(String email, String name) throws EmailInUseException, PasswordInvalidException, EmailInvalidException, NameInvalidException
    {
        if(name.isEmpty())
            throw new NameInvalidException("Name is empty");

        if(userRepository.findUserByEmail(email).isPresent())
            throw new EmailInUseException("Email address is already in use.");

        if(email.isEmpty() || !Pattern.matches(".*@.*\\..*", email))
            throw new EmailInvalidException("Invalid email address provided.");

        User user = new User();

        user.setEmail(email);
        user.setName(name);
        user.setPassword("ajierthnvbaewrcgahmewrjayweucngrancetwmhrajo,wxemrachweygtargncwearuhmwejirawhuvenrbgawenucirahejvraskdmvrsnuawiengrvawteuniraiomwejrvaiusdhrvuye");

        // roles not defined yet

        user.getRoles().add(roleRepository.findByRoleName(RoleEnum.GUEST));

        userRepository.save(user);
    }

}
