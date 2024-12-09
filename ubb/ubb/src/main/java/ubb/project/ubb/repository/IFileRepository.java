package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.project.ubb.data.File;

import java.util.List;

public interface IFileRepository extends JpaRepository<File, Long> {
    List<File> findByProjectId(Long projectId);
}
