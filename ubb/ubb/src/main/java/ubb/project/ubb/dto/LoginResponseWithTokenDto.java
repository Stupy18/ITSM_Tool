package ubb.project.ubb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseWithTokenDto {

    private String token;
    private LoginResponseDto user;
}
