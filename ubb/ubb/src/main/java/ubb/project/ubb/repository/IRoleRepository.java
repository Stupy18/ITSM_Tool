package ubb.project.ubb.repository;

import org.springframework.data.repository.CrudRepository;
import ubb.project.ubb.data.Role;
import ubb.project.ubb.data.RoleEnum;

public interface IRoleRepository extends CrudRepository<Role, Long> {

    Role findByRoleName(RoleEnum roleEnum);

}
