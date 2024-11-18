package ubb.project.ubb.dto;

import lombok.Data;
import java.util.List;

@Data
public class BugTicketDto {


    private Long id;


    private TinyProjectDto project;

    private String title;

    private String description;

    private String priority;

    private String status;

    private TinyUserDto createdBy;

    private TinyUserDto assignedTo;

    private List<Long> commentsIds;
}
