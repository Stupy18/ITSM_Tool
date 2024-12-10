package ubb.project.ubb.mapper;

import lombok.AllArgsConstructor;
import org.hibernate.annotations.Comments;
import org.springframework.stereotype.Component;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.data.Comment;
import ubb.project.ubb.dto.AddableTicketDto;
import ubb.project.ubb.dto.BugTicketDto;
import ubb.project.ubb.dto.TinyProjectDto;
import ubb.project.ubb.dto.TinyUserDto;
import ubb.project.ubb.repository.ICommentRepository;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.repository.ProjectRepository;

import java.util.HashSet;
import java.util.List;
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
        dto.setPriority(entity.getPriority());
        dto.setStatus(entity.getStatus());
        List<Comment> comments = commentRepository.findByBugTicket_Id(entity.getId());
        if(!comments.isEmpty())
            dto.setCommentsIds(comments.stream().map(Comment::getId).toList());


        TinyProjectDto tinyProj = new TinyProjectDto();
        tinyProj.setId(entity.getProject().getId());
        tinyProj.setProjectName(entity.getProject().getProjectName());
        dto.setProject(tinyProj);

        TinyUserDto tinyAssigned = new TinyUserDto();
        tinyAssigned.setId(entity.getAssignedTo().getId());
        tinyAssigned.setName(entity.getAssignedTo().getName());
        dto.setAssignedTo(tinyAssigned);

        TinyUserDto tinyCreated = new TinyUserDto();
        tinyCreated.setId(entity.getCreatedBy().getId());
        tinyCreated.setName(entity.getCreatedBy().getName());
        dto.setCreatedBy(tinyCreated);

        return dto;
    }

    public BugTicket dtoToEntity(BugTicketDto dto){
        BugTicket entity = new BugTicket();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setProject(projectRepository.findById(dto.getProject().getId()).get());
        entity.setPriority(dto.getPriority());
        entity.setStatus(dto.getStatus());
        if(dto.getCommentsIds().isEmpty())
            entity.setComments(new HashSet<>());
        entity.setComments(dto.getCommentsIds().stream().map((Long id)->{return commentRepository.findById(id).get();}).collect(Collectors.toSet()));
        entity.setAssignedTo(userRepository.findById(dto.getAssignedTo().getId()).get());
        entity.setCreatedBy(userRepository.findById(dto.getCreatedBy().getId()).get());
        return entity;
    }

    public BugTicket addableDtoToEntity(AddableTicketDto ticket) {
        BugTicket entity = new BugTicket();
        entity.setTitle(ticket.getTitle());
        entity.setDescription(ticket.getDescription());

        if(projectRepository.findById(ticket.getProjectId()).isPresent())
            entity.setProject(projectRepository.findById(ticket.getProjectId()).get());

        entity.setPriority(ticket.getPriority());
        entity.setStatus(ticket.getStatus());
        entity.setComments(new HashSet<>());
        entity.setAssignedTo(null);

        if(userRepository.findById(ticket.getCreatedById()).isPresent())
            entity.setCreatedBy(userRepository.findById(ticket.getCreatedById()).get());

        return entity;
    }
}
