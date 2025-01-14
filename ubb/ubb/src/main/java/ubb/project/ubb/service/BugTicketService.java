package ubb.project.ubb.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.dto.AddableTicketDto;
import ubb.project.ubb.dto.BugTicketDto;
import ubb.project.ubb.mapper.BugTicketMapper;
import ubb.project.ubb.repository.IBugTicketRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BugTicketService {

    IBugTicketRepository bugTicketRepository;
    BugTicketMapper bugTicketMapper;

    public List<BugTicketDto> getByAsignee(Long id) {
        return bugTicketRepository.getBugTicketByAssignedTo_Id(id).stream().map((BugTicket ticket)->{return bugTicketMapper.entityToDto(ticket);}).toList();
    }

    public List<BugTicketDto> getByProject(Long id){
        return bugTicketRepository.findAllByProject_Id(id).stream().map((BugTicket ticket)->{return bugTicketMapper.entityToDto(ticket);}).toList();
    }

    public BugTicket addTicket(AddableTicketDto ticket) {
        BugTicket entity = bugTicketMapper.addableDtoToEntity(ticket);
        bugTicketRepository.save(entity);
        return entity;
    }

    public List<BugTicketDto> getByCreator(Long id) {
        return bugTicketRepository.findAllByCreatedBy_Id(id).stream().map((BugTicket ticket) -> {
            return bugTicketMapper.entityToDto(ticket);
        }).toList();
    }

    public BugTicketDto updateTicketStatus(Long id, String newStatus) {
        BugTicket ticket = bugTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus(newStatus);
        bugTicketRepository.save(ticket);

        return bugTicketMapper.entityToDto(ticket);
    }

}
