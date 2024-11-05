package ubb.project.ubb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetailsDto {
    private String to;
    private String projectLink;
    private String userCredentials;
    private String passwordCredentials;
}