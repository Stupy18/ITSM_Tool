package ubb.project.ubb.controller;


import ch.qos.logback.classic.spi.IThrowableProxy;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.project.ubb.dto.EmailDetailsDto;
import ubb.project.ubb.dto.UserRegistrationDto;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.service.EmailService;
import ubb.project.ubb.service.UserRegistrationService;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:8080", "http://127.0.0.1:3000/**", "http://localhost:4200/**", "http://localhost:4200", "http://127.0.0.1:4200" }, maxAge = 3600)
@RequestMapping(path = {"/email/to"})
@AllArgsConstructor
public class EmailController {

    private final EmailService emailService;
    private final UserRegistrationService userRegistrationService;

    @PostMapping("/client")
    public ResponseEntity<String> sendEmailToClient(@RequestBody EmailDetailsDto emailDetails) {
        try {
            userRegistrationService.registerGuest(emailDetails.getTo(), emailDetails.getClientName());
            emailService.sendEmailToClient(emailDetails.getTo(), emailDetails.getClientName(), emailDetails.getProjectId());
            return ResponseEntity.ok("Client email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in sending client email: " + e.getMessage());
        }
    }

    @PostMapping("/developer")
    public ResponseEntity<String> sendEmailToDeveloper(@RequestBody EmailDetailsDto emailDetails) {
        try {
            emailService.sendEmailToDeveloper(
                    emailDetails.getTo(),
                    emailDetails.getUserCredentials(),
                    emailDetails.getPasswordCredentials()
            );
            return ResponseEntity.ok("Developer email sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in sending developer email: " + e.getMessage());
        }
    }

}
