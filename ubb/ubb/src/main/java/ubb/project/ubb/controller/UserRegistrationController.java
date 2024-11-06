package ubb.project.ubb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.EmailInUseException;
import ubb.project.ubb.exception.EmailInvalidException;
import ubb.project.ubb.exception.NameInvalidException;
import ubb.project.ubb.exception.PasswordInvalidException;
import ubb.project.ubb.service.UserRegistrationService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/register")
public class UserRegistrationController {

    private final UserRegistrationService userRegistrationService;

    public UserRegistrationController(UserRegistrationService userRegistrationService) { this.userRegistrationService = userRegistrationService; }

    @PostMapping()
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody UserRegistrationDto userRegistrationDto) throws EmailInUseException, EmailInvalidException, PasswordInvalidException
    {
        try{
            userRegistrationService.registerUser(userRegistrationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
        }
        catch(EmailInUseException e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        }
        catch(EmailInvalidException | PasswordInvalidException | NameInvalidException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(Map.of("message", e.getMessage()));
        }
    }

}
