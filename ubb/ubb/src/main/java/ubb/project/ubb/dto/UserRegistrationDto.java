package ubb.project.ubb.dto;

import com.opencsv.bean.processor.ConvertEmptyOrBlankStringsToNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ubb.project.ubb.controller.UserRegistrationController;

@Getter @Setter
@AllArgsConstructor
public class UserRegistrationDto {

    private String email;
    private String password;
    private String name;

    public UserRegistrationDto(String email, String name)
    {
        this.email = email;
        this.name = name;
    }

}
