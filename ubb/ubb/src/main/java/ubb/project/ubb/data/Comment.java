package ubb.project.ubb.data;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private BugTicket bugTicket;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    private String content;

    private LocalDateTime createdAt;


}

