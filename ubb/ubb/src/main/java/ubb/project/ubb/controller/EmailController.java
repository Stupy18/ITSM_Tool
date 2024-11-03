package ubb.project.ubb.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import ubb.project.ubb.dto.EmailDetailsDto;
import ubb.project.ubb.service.EmailService;

@RestController
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:8080", "http://127.0.0.1:4200/**", "http://localhost:4200/**", "http://localhost:4200", "http://127.0.0.1:4200" }, maxAge = 3600)
@RequestMapping(path = {"/email/to"})
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/client")
    public String sendEmailToClient(@RequestBody EmailDetailsDto emailDetails) {
        try {
            emailService.sendEmailToClient(emailDetails.getTo(), emailDetails.getProjectLink());
            return "Client email sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error in sending client email: " + e.getMessage();
        }
    }

    @PostMapping("/developer")
    public String sendEmailToDeveloper(@RequestBody EmailDetailsDto emailDetails) {
        try {
            emailService.sendEmailToDeveloper(
                    emailDetails.getTo(),
                    emailDetails.getUserCredentials(),
                    emailDetails.getPasswordCredentials()
            );
            return "Developer email sent successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error in sending developer email: " + e.getMessage();
        }
    }

}
