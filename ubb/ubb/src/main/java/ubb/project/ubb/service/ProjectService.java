package ubb.project.ubb.service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.mapper.ProjectMapper;
import ubb.project.ubb.repository.CompanyRepository;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.repository.ProjectRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjectService {

    private ProjectRepository projectRepository;

    private IUserRepository userRepository;

    private CompanyRepository companyRepository;

    private ProjectMapper mapper;

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

    public ProjectDto findById(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        return project.map(value -> mapper.entityToDto(value)).orElse(null);
    }

    public List<ProjectDto> getAll() {
        return projectRepository.findAll().stream().map(mapper::entityToDto).toList();
    }
}