package ubb.project.ubb.service;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.BugTicket;
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
}
