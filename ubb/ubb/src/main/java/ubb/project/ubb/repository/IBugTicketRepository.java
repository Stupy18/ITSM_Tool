package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.project.ubb.data.BugTicket;

import java.util.List;

@Repository
public interface IBugTicketRepository extends JpaRepository<BugTicket,Long> {

    List<BugTicket> getBugTicketByAssignedTo_Id(Long id);

    List<BugTicket> findAllByProject_Id(Long id);
}
