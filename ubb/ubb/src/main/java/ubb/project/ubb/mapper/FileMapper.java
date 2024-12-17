package ubb.project.ubb.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import ubb.project.ubb.data.File;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.data.User;
import ubb.project.ubb.dto.file_upload.UploadFileRequestDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.repository.IFileRepository;
import ubb.project.ubb.repository.IProjectRepository;
import ubb.project.ubb.repository.IUserRepository;

import java.io.IOException;
import java.io.InputStream;

@Component
@AllArgsConstructor
public class FileMapper {

    private final IFileRepository fileRepository;
    private final IProjectRepository projectRepository;
    private final IUserRepository userRepository;

    public File dtoToEntity(UploadFileRequestDto dto) throws NotExistsException, IOException {
        File file = new File();
        Project project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new NotExistsException("Project with ID " + dto.getProjectId() + " does not exist"));

        User uploadedBy = userRepository.findById(dto.getUploadedBy())
                .orElseThrow(() -> new NotExistsException("User with ID " + dto.getUploadedBy() + " does not exist"));

        MultipartFile mFile = dto.getFile();
        if (mFile == null || mFile.isEmpty()) {
            throw new IllegalArgumentException("File must not be null or empty");
        }

        file.setProject(project);
        file.setUploadedBy(uploadedBy);
        file.setFileName(mFile.getOriginalFilename());
        file.setFileType(mFile.getContentType());

        try (InputStream inputStream = mFile.getInputStream()) {
            file.setFileContent(inputStream.readAllBytes());
        }

        return file;
    }

}
