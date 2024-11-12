package ubb.project.ubb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ubb.project.ubb.data.Role;
import ubb.project.ubb.data.UserRole;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {

    private Long id;
    private String email;
    private String username;
    private List<UserRole> roleIds;
}
