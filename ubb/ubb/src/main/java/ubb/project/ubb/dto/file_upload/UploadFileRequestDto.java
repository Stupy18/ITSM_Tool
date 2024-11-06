package ubb.project.ubb.dto.file_upload;


import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UploadFileRequestDto {
    private Long projectId;
    private MultipartFile file;
}