package ubb.project.ubb.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.exception.*;
import ubb.project.ubb.repository.IUserRepository;

import java.util.Optional;

class UserRegistrationServiceTest {

    @Mock
    private IUserRepository userRepository;

    @InjectMocks
    private UserRegistrationService userRegistrationService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @Test
    void testRegisterUser_success() throws Exception {
        UserRegistrationDto userDto = new UserRegistrationDto("test@example.com", "password123", "Test User");

        when(userRepository.findUserByEmail(userDto.getEmail())).thenReturn(null);

        userRegistrationService.registerUser(userDto);

        verify(userRepository, times(1)).save(any(User.class)); // Ensure save is called once
    }

    @Test
    void testRegisterUser_emailInUse() {
        UserRegistrationDto userDto = new UserRegistrationDto("test@example.com", "password123", "Test User");

        when(userRepository.findUserByEmail(userDto.getEmail())).thenReturn(Optional.of(new User()));

        assertThrows(EmailInUseException.class, () -> userRegistrationService.registerUser(userDto));
    }

    @Test
    void testRegisterUser_emailInvalid() {
        UserRegistrationDto userDto = new UserRegistrationDto("invalid-email", "password123", "Test User");

        assertThrows(EmailInvalidException.class, () -> userRegistrationService.registerUser(userDto));
    }

    @Test
    void testRegisterUser_passwordInvalid() {
        UserRegistrationDto userDto = new UserRegistrationDto("test@example.com", "short", "Test User");

        assertThrows(PasswordInvalidException.class, () -> userRegistrationService.registerUser(userDto));
    }

    @Test
    void testRegisterUser_nameInvalid() {
        UserRegistrationDto userDto = new UserRegistrationDto("test@example.com", "password123", "");

        assertThrows(NameInvalidException.class, () -> userRegistrationService.registerUser(userDto));
    }
}
