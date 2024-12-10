package ubb.project.ubb.dto;

import lombok.Data;

@Data
public class AddableTicketDto {
    private Long createdById;

    private String description;

    private String priority;

    private Long projectId;

    private String status;

    private String title;

}
