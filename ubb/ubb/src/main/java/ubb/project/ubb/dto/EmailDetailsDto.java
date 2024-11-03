package ubb.project.ubb.dto;

import lombok.Data;

@Data
public class EmailDetailsDto {
    private String to;
    private String projectLink;
    private String userCredentials;
    private String passwordCredentials;
}