package ubb.project.ubb.dto;

import lombok.Data;
import java.util.List;

@Data
public class BugTicketDto {


    private Long id;


    private Long projectId;

    private String title;

    private String description;

    private String priority;

    private String status;

    private Long createdById;

    private Long assignedToId;

    private List<Long> commentsIds;
}
