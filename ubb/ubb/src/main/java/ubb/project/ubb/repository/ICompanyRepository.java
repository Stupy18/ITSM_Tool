package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.project.ubb.data.Company;

import java.util.Optional;

@Repository
public interface ICompanyRepository extends JpaRepository<Company, Long> {

    public Optional<Company> findByCompanyName(String name);

}
