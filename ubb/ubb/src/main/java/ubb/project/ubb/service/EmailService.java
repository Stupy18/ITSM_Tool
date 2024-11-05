package ubb.project.ubb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


    public void sendEmailToClient(String to, String projectLink) {
        String subject = "Welcome to Our Team!";
        String text = String.format(
                "Dear Client,\n\n" +
                        "We are thrilled to welcome you to our team! We look forward to a successful collaboration on your project.\n\n" +
                        "Please find the link to access your project below:\n" +
                        "%s\n\n" +
                        "Thank you for choosing us, and don't hesitate to reach out with any questions.\n\n" +
                        "Best regards,\nThe Team",
                projectLink
        );

        sendEmail(to, subject, text);
    }

    public void sendEmailToDeveloper(String to, String userCredentials, String passwordCredentials) {
        String subject = "Welcome to the Team!";
        String text = String.format(
                "Dear Developer,\n\n" +
                        "Welcome aboard! We are excited to have you as part of our team.\n\n" +
                        "Here are your credentials to access our platform:\n" +
                        "Username: %s\n" +
                        "Password: %s\n\n" +
                        "We hope you will have a fulfilling and productive experience with us.\n" +
                        "Feel free to reach out if you have any questions or need assistance getting started.\n\n" +
                        "Best regards,\nThe Team",
                userCredentials, passwordCredentials
        );

        sendEmail(to, subject, text);
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("stupariubogdan@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

}
