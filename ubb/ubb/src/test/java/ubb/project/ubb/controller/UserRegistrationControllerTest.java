package ubb.project.ubb.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.*;
import ubb.project.ubb.service.UserRegistrationService;

import java.util.Map;
import java.util.Objects;

class UserRegistrationControllerTest {

    @Mock
    private UserRegistrationService userRegistrationService;

    @InjectMocks
    private UserRegistrationController userRegistrationController;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @Test
    void testRegisterUser_success() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("test@test.com", "123456", "abc");

        ResponseEntity<Map<String, String>> response = userRegistrationController.registerUser(userDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void testRegisterUser_emailInUse() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("test@test.com", "123456", "abc");

        doThrow(new EmailInUseException("Email address is already in use."))
                .when(userRegistrationService).registerUser(userDto);

        ResponseEntity<Map<String, String>> response = userRegistrationController.registerUser(userDto);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    void testRegisterUser_emailInvalid() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("invalid-email", "123456", "abc");

        doThrow(new EmailInvalidException("Invalid email address provided."))
                .when(userRegistrationService).registerUser(userDto);

        ResponseEntity<Map<String, String>> response = userRegistrationController.registerUser(userDto);

        assertEquals(HttpStatus.UNPROCESSABLE_ENTITY, response.getStatusCode());
        assertTrue(Objects.requireNonNull(response.getBody()).containsValue("Invalid email address provided."));
    }

    @Test
    void testRegisterUser_passwordInvalid() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("test@test.com", "12345", "abc");

        doThrow(new PasswordInvalidException("Password must contain at least 6 characters."))
                .when(userRegistrationService).registerUser(userDto);

        ResponseEntity<Map<String, String>> response = userRegistrationController.registerUser(userDto);

        assertEquals(HttpStatus.UNPROCESSABLE_ENTITY, response.getStatusCode());
        assertTrue(Objects.requireNonNull(response.getBody()).containsValue("Password must contain at least 6 characters."));
    }

    @Test
    void testRegisterUser_nameInvalid() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("test@test.com", "123456", "");

        doThrow(new EmailInUseException("Name is empty"))
                .when(userRegistrationService).registerUser(userDto);

        ResponseEntity<Map<String, String>> response = userRegistrationController.registerUser(userDto);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertTrue(Objects.requireNonNull(response.getBody()).containsValue("Name is empty"));
    }
}
