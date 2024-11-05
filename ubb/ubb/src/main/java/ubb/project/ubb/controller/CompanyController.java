package ubb.project.ubb.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ubb.project.ubb.dto.CompanyRegistrationDto;
import ubb.project.ubb.exception.CompanyExistsException;
import ubb.project.ubb.service.CompanyRegistrationService;

@RestController
@RequestMapping("/company")
public class CompanyController {

    private final CompanyRegistrationService companyRegistrationService;

    public CompanyController(CompanyRegistrationService companyRegistrationService) { this.companyRegistrationService = companyRegistrationService; }

    @PostMapping("/register")
    public void registerCompany(@RequestBody CompanyRegistrationDto companyRegistrationDto) throws CompanyExistsException
    {
        companyRegistrationService.registerCompany(companyRegistrationDto);
    }

}
