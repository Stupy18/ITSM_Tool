package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.project.ubb.data.File;

public interface IFileRepository extends JpaRepository<File, Long> {
}
