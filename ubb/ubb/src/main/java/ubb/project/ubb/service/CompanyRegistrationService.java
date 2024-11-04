package ubb.project.ubb.service;

import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Company;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.CompanyDto;
import ubb.project.ubb.exception.CompanyExistsException;
import ubb.project.ubb.repository.ICompanyRepository;

@Service
public class CompanyRegistrationService {

    private final ICompanyRepository companyRepository;

    public CompanyRegistrationService(ICompanyRepository companyRepository) { this.companyRepository = companyRepository; }

    public Company registerCompany(CompanyDto companyDto) throws CompanyExistsException
    {
        if(companyRepository.findByCompanyName(companyDto.getCompanyName()).isPresent())
            throw new CompanyExistsException("Company already exists");

        Company company = new Company();
        company.setCompanyName(companyDto.getCompanyName());

        companyRepository.save(company);
        return company;

    }

}
