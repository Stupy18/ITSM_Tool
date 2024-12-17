package ubb.project.ubb.dto.file_upload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FileResponseDto {
    private Long id;
    private Long projectId;
    private String fileName;
    private String fileType;
    private String uploadedByName;
}