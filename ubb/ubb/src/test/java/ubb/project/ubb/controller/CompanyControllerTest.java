package ubb.project.ubb.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import ubb.project.ubb.dto.CompanyRegistrationDto;
import ubb.project.ubb.exception.*;
import ubb.project.ubb.service.CompanyRegistrationService;

import java.util.Map;

class CompanyControllerTest {

    @Mock
    private CompanyRegistrationService companyRegistrationService;

    @InjectMocks
    private CompanyController companyController;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this);}

    @Test
    void testRegisterCompany_success() throws Exception {
        CompanyRegistrationDto companyDto = new CompanyRegistrationDto("abc");

        ResponseEntity<Map<String, String>> response = companyController.registerCompany(companyDto);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void testRegisterCompany_companyExists() throws Exception {
        CompanyRegistrationDto companyDto = new CompanyRegistrationDto("abc");

        doThrow(new CompanyExistsException("Company already exists"))
                .when(companyRegistrationService).registerCompany(companyDto);

        ResponseEntity<Map<String, String>> response = companyController.registerCompany(companyDto);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }
}
