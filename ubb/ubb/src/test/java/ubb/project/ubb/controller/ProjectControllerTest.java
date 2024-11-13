package ubb.project.ubb.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.service.ProjectService;
import ubb.project.ubb.data.Project;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProjectController.class)
@ExtendWith(MockitoExtension.class)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;

    @Autowired
    private ObjectMapper objectMapper;

    private ProjectDto projectDto;

    @BeforeEach
    void setUp() {
        projectDto = new ProjectDto();
        projectDto.setProjectName("Test Project");
        projectDto.setStartDate(LocalDate.now());
        projectDto.setEndDate(LocalDate.now().plusDays(30));
        projectDto.setUserIds(Set.of(1L, 2L));
    }

    @Test
    public void createProject_returnsSuccessMessage_whenProjectCreatedSuccessfully() throws Exception {
        doNothing().when(projectService).createProject(any(ProjectDto.class), any(Long.class));

        mockMvc.perform(post("/api/projects/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectDto))
                        .param("companyId", "1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Project created successfully!"));
    }

    @Test
    public void createProject_returnsErrorMessage_whenExceptionThrown() throws Exception {
        doThrow(new RuntimeException("Error in project creation")).when(projectService).createProject(any(ProjectDto.class), any(Long.class));

        mockMvc.perform(post("/api/projects/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(projectDto))
                        .param("companyId", "1"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Error in project creation: Error in project creation"));
    }

    @Test
    public void getProjectsForCompany_returnsProjects_whenProjectsExist() throws Exception {
        Project project = new Project();
        project.setProjectName("Test Project");
        project.setStartDate(LocalDate.now());
        project.setEndDate(LocalDate.now().plusDays(30));

        when(projectService.findAllByCompanyId(1L)).thenReturn(List.of(project));

        mockMvc.perform(get("/api/projects/company/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"projectName\":\"Test Project\",\"startDate\":\"" + LocalDate.now() + "\",\"endDate\":\"" + LocalDate.now().plusDays(30) + "\"}]"));
    }

    @Test
    public void getProjectsForCompany_returnsEmptyList_whenNoProjectsExist() throws Exception {
        when(projectService.findAllByCompanyId(1L)).thenReturn(List.of());

        mockMvc.perform(get("/api/projects/company/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("[]"));
    }

    @Test
    public void getProjectsForCompany_returnsErrorMessage_whenCompanyNotFound() throws Exception {
        when(projectService.findAllByCompanyId(999L)).thenThrow(new RuntimeException("Company not found"));

        mockMvc.perform(get("/api/projects/company/999"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Error: Company not found"));
    }
}
