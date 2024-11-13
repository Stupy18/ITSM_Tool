package ubb.project.ubb.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class ProjectDto {
    private String projectName;
    private LocalDate startDate;
    private LocalDate endDate;
    private Set<Long> userIds;
}