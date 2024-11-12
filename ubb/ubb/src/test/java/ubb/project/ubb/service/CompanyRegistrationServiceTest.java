package ubb.project.ubb.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import ubb.project.ubb.data.Company;
import ubb.project.ubb.dto.CompanyRegistrationDto;
import ubb.project.ubb.exception.*;
import ubb.project.ubb.repository.ICompanyRepository;

class CompanyRegistrationServiceTest {

    @Mock
    private ICompanyRepository companyRepository;

    @InjectMocks
    private CompanyRegistrationService companyRegistrationService;

    @BeforeEach
    void setUp() { MockitoAnnotations.openMocks(this); }

    @Test
    void testRegisterCompany_successful() throws Exception {
        CompanyRegistrationDto companyDto = new CompanyRegistrationDto("abc");

        when(companyRepository.findByCompanyName(companyDto.getCompanyName())).thenReturn(java.util.Optional.empty());

        companyRegistrationService.registerCompany(companyDto);

        verify(companyRepository, times(1)).save(any(Company.class));
    }

    @Test
    void testRegisterCompany_companyExists() {
        CompanyRegistrationDto companyDto = new CompanyRegistrationDto("abc");

        when(companyRepository.findByCompanyName(companyDto.getCompanyName())).thenReturn(java.util.Optional.of(new Company()));

        assertThrows(CompanyExistsException.class, () -> companyRegistrationService.registerCompany(companyDto));
    }
}
