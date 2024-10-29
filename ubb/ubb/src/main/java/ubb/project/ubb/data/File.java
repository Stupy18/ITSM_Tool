package ubb.project.ubb.data;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private String fileName;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] fileContent;

    private String fileType;

}
