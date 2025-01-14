package ubb.project.ubb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.dto.ProjectDto;
import ubb.project.ubb.service.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody ProjectDto projectDto, @RequestParam Long companyId) {
        try {
            projectService.createProject(projectDto, companyId);
            return ResponseEntity.ok("Project created successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // pt Dahsboard cu toate proiectele
    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<Project>> getProjectsForCompany(@PathVariable Long companyId) {
        List<Project> projects = projectService.findAllByCompanyId(companyId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id){
        return ResponseEntity.ok(projectService.findById(id));
    }

    @GetMapping
    public List<ProjectDto> getAllProjs(){
        return projectService.getAll();

    }

}