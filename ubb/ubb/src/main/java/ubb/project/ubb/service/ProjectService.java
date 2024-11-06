package ubb.project.ubb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.repository.CompanyRepository;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.repository.ProjectRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public Project createProject(ProjectDto projectDto, Long companyId) {
        Project project = new Project();
        project.setProjectName(projectDto.getProjectName());
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());

        Set<User> users = new HashSet<>(userRepository.findAllById(projectDto.getUserIds()));
        project.setUsers(users);

        project.setCompany(companyRepository.findById(companyId).orElseThrow(() -> new RuntimeException("Company not found")));

        return projectRepository.save(project);
    }

    public List<Project> findAllByCompanyId(Long companyId) {
        return projectRepository.findAllByCompanyId(companyId);
    }
}