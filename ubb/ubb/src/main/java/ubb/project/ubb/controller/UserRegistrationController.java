package ubb.project.ubb.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.EmailInUseException;
import ubb.project.ubb.exception.EmailInvalidException;
import ubb.project.ubb.exception.PasswordInvalidException;
import ubb.project.ubb.service.UserRegistrationService;

@RestController
@RequestMapping("/register")
public class UserRegistrationController {

    private final UserRegistrationService userRegistrationService;

    public UserRegistrationController(UserRegistrationService userRegistrationService) { this.userRegistrationService = userRegistrationService; }

    @PostMapping()
    public void registerCompany(@RequestBody UserRegistrationDto userRegistrationDto) throws EmailInUseException, EmailInvalidException, PasswordInvalidException
    {
        userRegistrationService.registerUser(userRegistrationDto);
    }

}
