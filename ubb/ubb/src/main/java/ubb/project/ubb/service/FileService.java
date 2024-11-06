package ubb.project.ubb.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ubb.project.ubb.data.File;
import ubb.project.ubb.data.Project;
import ubb.project.ubb.dto.file_upload.FileResponseDto;
import ubb.project.ubb.dto.file_upload.UploadFileRequestDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.repository.IFileRepository;
import ubb.project.ubb.repository.IProjectRepository;

import java.io.IOException;

@Service
public class FileService {

    private final IFileRepository fileRepository;
    private final IProjectRepository projectRepository;

    public FileService(IFileRepository fileRepository, IProjectRepository projectRepository) {
        this.fileRepository = fileRepository;
        this.projectRepository = projectRepository;
    }

    public FileResponseDto uploadFile(UploadFileRequestDto requestDto) throws NotExistsException, IOException {
        // Retrieve the associated project
        Project project = projectRepository.findById(requestDto.getProjectId())
                .orElseThrow(() -> new NotExistsException("Project with ID " + requestDto.getProjectId() + " does not exist"));

        MultipartFile multipartFile = requestDto.getFile();

        // Create a new File entity
        File file = new File();
        file.setProject(project);
        file.setFileName(multipartFile.getOriginalFilename());
        file.setFileType(multipartFile.getContentType());
        file.setFileContent(multipartFile.getBytes());

        // Save the file to the repository
        File savedFile = fileRepository.save(file);

        // Return the response DTO
        return new FileResponseDto(
                savedFile.getId(),
                project.getId(),
                savedFile.getFileName(),
                savedFile.getFileType()
        );
    }

    // Optional: Method to retrieve a file by ID
    public File getFileById(Long fileId) throws NotExistsException {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new NotExistsException("File with ID " + fileId + " does not exist"));
    }
}