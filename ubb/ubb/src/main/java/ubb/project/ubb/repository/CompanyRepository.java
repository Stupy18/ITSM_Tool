package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ubb.project.ubb.data.Company;
import ubb.project.ubb.data.User;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    Optional<Company> findById(Long id);

}
