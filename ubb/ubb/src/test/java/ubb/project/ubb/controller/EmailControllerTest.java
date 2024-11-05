package ubb.project.ubb.controller;



import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import ubb.project.ubb.dto.EmailDetailsDto;
import ubb.project.ubb.service.EmailService;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmailController.class)
@ExtendWith(MockitoExtension.class)
public class EmailControllerTest {



    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;


    @BeforeEach
    void setUp(WebApplicationContext context) {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    public void sendEmailToClient_returnsSuccessMessage_whenEmailSentSuccessfully() throws Exception {
        EmailDetailsDto emailDetails = new EmailDetailsDto("client@example.com", "http://project-link.com", null, null);

        doNothing().when(emailService).sendEmailToClient(emailDetails.getTo(), emailDetails.getProjectLink());

        mockMvc.perform(post("/email/to/client")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDetails)))
                .andExpect(status().isOk())
                .andExpect(content().string("Client email sent successfully"));
    }

    @Test
    public void sendEmailToDeveloper_returnsSuccessMessage_whenEmailSentSuccessfully() throws Exception {
        EmailDetailsDto emailDetails = new EmailDetailsDto("developer@example.com", null, "devUser", "devPass");

        doNothing().when(emailService).sendEmailToDeveloper(emailDetails.getTo(), emailDetails.getUserCredentials(), emailDetails.getPasswordCredentials());

        mockMvc.perform(post("/email/to/developer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDetails)))
                .andExpect(status().isOk())
                .andExpect(content().string("Developer email sent successfully"));
    }

    @Test
    public void sendEmailToClient_returnsErrorMessage_whenExceptionThrown() throws Exception {
        EmailDetailsDto emailDetails = new EmailDetailsDto("client@example.com", "http://project-link.com", null, null);

        doThrow(new RuntimeException("Email sending failed")).when(emailService).sendEmailToClient(emailDetails.getTo(), emailDetails.getProjectLink());

        mockMvc.perform(post("/email/to/client")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDetails)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error in sending client email: Email sending failed"));
    }

    @Test
    public void sendEmailToDeveloper_returnsErrorMessage_whenExceptionThrown() throws Exception {
        EmailDetailsDto emailDetails = new EmailDetailsDto("developer@example.com", null, "devUser", "devPass");

        doThrow(new RuntimeException("Email sending failed")).when(emailService).sendEmailToDeveloper(emailDetails.getTo(), emailDetails.getUserCredentials(), emailDetails.getPasswordCredentials());

        mockMvc.perform(post("/email/to/developer")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDetails)))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error in sending developer email: Email sending failed"));
    }
}
