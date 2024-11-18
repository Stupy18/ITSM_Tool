package ubb.project.ubb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ubb.project.ubb.data.Comment;

@Repository
public interface ICommentRepository extends JpaRepository<Comment,Long> {
}
