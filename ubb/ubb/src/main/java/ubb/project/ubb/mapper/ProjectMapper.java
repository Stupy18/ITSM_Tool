package ubb.project.ubb.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.repository.IBugTicketRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.System.in;
import static java.util.stream.Collectors.toList;

@Component
@AllArgsConstructor
public class ProjectMapper {

    private IBugTicketRepository bugTicketRepository;

    public ProjectDto entityToDto(Project entity){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setProjectName(entity.getProjectName());
        projectDto.setStartDate(entity.getStartDate());
        projectDto.setEndDate(entity.getEndDate());

        List<Long> ids = new ArrayList<>();
        for(User user : entity.getUsers()){
            ids.add(user.getId());
        }

        projectDto.setUserIds(new HashSet<>(ids));

        List<Long> ids2 = new ArrayList<>();
        for(BugTicket ticket : bugTicketRepository.findAllByProject_Id(entity.getId())){
            ids2.add(ticket.getId());
        }

        projectDto.setBugTicketIds(ids2);

        return projectDto;
    }
}
