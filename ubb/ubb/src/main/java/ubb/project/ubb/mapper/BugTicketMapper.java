package ubb.project.ubb.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.data.Comment;
import ubb.project.ubb.dto.BugTicketDto;
import ubb.project.ubb.repository.ICommentRepository;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.repository.ProjectRepository;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class BugTicketMapper {

    ProjectRepository projectRepository;
    ICommentRepository commentRepository;
    IUserRepository userRepository;

    public BugTicketDto entityToDto(BugTicket entity){
        BugTicketDto dto = new BugTicketDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setProjectId(entity.getProject().getId());
        dto.setPriority(entity.getPriority());
        dto.setStatus(entity.getStatus());
        dto.setCommentsIds(entity.getComments().stream().map(Comment::getId).toList());
        dto.setAssignedToId(entity.getAssignedTo().getId());
        dto.setCreatedById(entity.getCreatedBy().getId());
        return dto;
    }

    public BugTicket dtoToEntity(BugTicketDto dto){
        BugTicket entity = new BugTicket();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setProject(projectRepository.findById(dto.getProjectId()).get());
        entity.setPriority(dto.getPriority());
        entity.setStatus(dto.getStatus());
        if(dto.getCommentsIds().isEmpty())
            entity.setComments(new HashSet<>());
        entity.setComments(dto.getCommentsIds().stream().map((Long id)->{return commentRepository.findById(id).get();}).collect(Collectors.toSet()));
        entity.setAssignedTo(userRepository.findById(dto.getAssignedToId()).get());
        entity.setCreatedBy(userRepository.findById(dto.getCreatedById()).get());
        return entity;
    }
}
