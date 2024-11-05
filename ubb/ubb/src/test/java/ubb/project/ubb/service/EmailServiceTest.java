package ubb.project.ubb.service;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void sendEmailToClient_sendsEmailSuccessfully() {
        String to = "client@example.com";
        String projectLink = "http://project-link.com";

        emailService.sendEmailToClient(to, projectLink);

        verify(mailSender).send(any(SimpleMailMessage.class));
    }

    @Test
    public void sendEmailToDeveloper_sendsEmailSuccessfully() {
        String to = "developer@example.com";
        String username = "developerUser";
        String password = "securePassword";

        emailService.sendEmailToDeveloper(to, username, password);

        verify(mailSender).send(any(SimpleMailMessage.class));
    }
}
