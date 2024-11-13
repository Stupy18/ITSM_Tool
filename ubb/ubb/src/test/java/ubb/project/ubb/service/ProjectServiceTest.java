package ubb.project.ubb.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import ubb.project.ubb.data.Company;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.repository.CompanyRepository;
import ubb.project.ubb.repository.IUserRepository;
import ubb.project.ubb.repository.ProjectRepository;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private IUserRepository userRepository;

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private ProjectService projectService;

    private ProjectDto projectDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        projectDto = new ProjectDto();
        projectDto.setProjectName("Test Project");
        projectDto.setStartDate(LocalDate.now());
        projectDto.setEndDate(LocalDate.now().plusDays(30));
        projectDto.setUserIds(Set.of(1L, 2L));
    }

    @Test
    void createProject_success() {
        User user1 = new User();
        user1.setId(1L);
        User user2 = new User();
        user2.setId(2L);
        Set<User> users = new HashSet<>();
        users.add(user1);
        users.add(user2);

        when(userRepository.findAllById(projectDto.getUserIds())).thenReturn((List<User>) users);
        when(companyRepository.findById(anyLong())).thenReturn(Optional.of(new Company()));

        Project createdProject = projectService.createProject(projectDto, 1L);

        verify(projectRepository).save(any(Project.class));
    }

    @Test
    void createProject_companyNotFound_throwsException() {
        when(companyRepository.findById(anyLong())).thenReturn(Optional.empty());

        try {
            projectService.createProject(projectDto, 1L);
        } catch (RuntimeException e) {
            assert(e.getMessage().equals("Company not found"));
        }

        verify(projectRepository, never()).save(any(Project.class));
    }

        @Test
        void createProject_invalidUserIds_throwsException() {
            when(userRepository.findAllById(projectDto.getUserIds())).thenReturn(List.of());

            try {
                projectService.createProject(projectDto, 1L);
            } catch (Exception e) {
                assert(e instanceof RuntimeException);
                assert(e.getMessage().equals("Users not found"));
            }

            verify(projectRepository, never()).save(any(Project.class));
        }

}
