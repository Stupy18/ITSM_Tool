package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.project.ubb.data.Project;

public interface IProjectRepository extends JpaRepository<Project, Long> {
}