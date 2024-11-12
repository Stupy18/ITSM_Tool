package ubb.project.ubb.service;

import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Company;
import ubb.project.ubb.dto.CompanyRegistrationDto;
import ubb.project.ubb.exception.CompanyExistsException;
import ubb.project.ubb.repository.ICompanyRepository;

@Service
public class CompanyRegistrationService {

    private final ICompanyRepository companyRepository;

    public CompanyRegistrationService(ICompanyRepository companyRepository) { this.companyRepository = companyRepository; }

    public void registerCompany(CompanyRegistrationDto companyRegistrationDto) throws CompanyExistsException
    {
        if(companyRepository.findByCompanyName(companyRegistrationDto.getCompanyName()).isPresent())
            throw new CompanyExistsException("Company already exists");

        Company company = new Company();
        company.setCompanyName(companyRegistrationDto.getCompanyName());

        companyRepository.save(company);
    }

}
