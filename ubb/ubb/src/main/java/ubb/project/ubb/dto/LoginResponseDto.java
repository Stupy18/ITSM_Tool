package ubb.project.ubb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ubb.project.ubb.data.Role;

import java.util.List;



@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDto {
    private Long id;
    private String email;
    private String username;
    private List<Long> roleIds;
}

