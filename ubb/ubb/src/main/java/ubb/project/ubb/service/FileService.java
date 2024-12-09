package ubb.project.ubb.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ubb.project.ubb.data.File;
import ubb.project.ubb.dto.file_upload.FileResponseDto;
import ubb.project.ubb.dto.file_upload.UploadFileRequestDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.mapper.FileMapper;
import ubb.project.ubb.repository.IFileRepository;

import java.io.IOException;

@AllArgsConstructor
@Service
public class FileService {

    private final IFileRepository fileRepository;

    private FileMapper mapper;

    public FileResponseDto uploadFile(UploadFileRequestDto requestDto) throws NotExistsException, IOException {
        // Save the file to the repository
        File savedFile = fileRepository.save(mapper.dtoToEntity(requestDto));

        // Return the response DTO
        return new FileResponseDto(
                savedFile.getId(),
                savedFile.getProject().getId(),
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