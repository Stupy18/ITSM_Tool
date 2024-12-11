package ubb.project.ubb.controller;


import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.data.BugTicket;
import ubb.project.ubb.data.User;
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
        User user= (User) authentication.getPrincipal();

        if(user.getId().equals(id))
            return service.getByCreator(id);

        return new ArrayList<>();
    }

}
