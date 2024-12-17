package ubb.project.ubb.controller;


import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.config.ITSMUserDetails;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.dto.AddableTicketDto;
import ubb.project.ubb.dto.BugTicketDto;
import ubb.project.ubb.service.BugTicketService;

import java.util.ArrayList;
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

    @GetMapping("/creator/{id}")
    List<BugTicketDto> getBugTicketsByCreator(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ITSMUserDetails userDetails = (ITSMUserDetails) authentication.getPrincipal();

        if(userDetails.getUser().getId()==id)
            return service.getByCreator(id);

        return new ArrayList<>();
    }

}
