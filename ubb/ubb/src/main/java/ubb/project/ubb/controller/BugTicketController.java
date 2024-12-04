package ubb.project.ubb.controller;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.project.ubb.dto.BugTicketDto;
import ubb.project.ubb.service.BugTicketService;

import java.util.List;

@RestController
@RequestMapping("/bugticket")
@AllArgsConstructor
public class BugTicketController {
    BugTicketService service;

    @GetMapping("/{id}")
    List<BugTicketDto> getBugTicketsByAssignee(@PathVariable Long id ){
        return service.getByAsignee(id);
    }

    @GetMapping("/creator/{id}")
    List<BugTicketDto> getBugTicketsByProject(@PathVariable Long id)
    {
        return service.getByCreator(id);
    }
}
