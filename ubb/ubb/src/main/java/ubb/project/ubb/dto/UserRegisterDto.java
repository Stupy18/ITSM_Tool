package ubb.project.ubb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class UserRegisterDto {

    private String email;
    private String password;
    private String name;

}
