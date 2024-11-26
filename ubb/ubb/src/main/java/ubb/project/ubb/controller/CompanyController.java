package ubb.project.ubb.controller;

import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.project.ubb.dto.CompanyRegistrationDto;
import ubb.project.ubb.exception.*;
import ubb.project.ubb.service.CompanyRegistrationService;

import java.util.Map;

@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyRegistrationService companyRegistrationService;

    public CompanyController(CompanyRegistrationService companyRegistrationService) { this.companyRegistrationService = companyRegistrationService; }

    @PostMapping("/registering")
    public ResponseEntity<Map<String, String>> registerCompany(@RequestBody CompanyRegistrationDto companyRegistrationDto)
    {
        try{
            companyRegistrationService.registerCompany(companyRegistrationDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Company registered successfully"));
        }
        catch(CompanyExistsException e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        }
    }

}
