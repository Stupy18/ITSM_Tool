package ubb.project.ubb.controller;


import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.dto.AddableTicketDto;
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

    @PostMapping("/add")
    BugTicket addBugTicket(@RequestBody AddableTicketDto ticket){
        return service.addTicket(ticket);
    }

}
