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
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class FileService {

    private final IFileRepository fileRepository;

    private FileMapper mapper;

    public FileResponseDto uploadFile(UploadFileRequestDto requestDto) throws NotExistsException, IOException {
        File savedFile = fileRepository.save(mapper.dtoToEntity(requestDto));
        return new FileResponseDto(
                savedFile.getId(),
                savedFile.getProject().getId(),
                savedFile.getFileName(),
                savedFile.getFileType(),
                savedFile.getUploadedBy().getName()
        );
    }

    public File getFileById(Long fileId) throws NotExistsException {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new NotExistsException("File with ID " + fileId + " does not exist"));
    }

    public List<FileResponseDto> getFilesByProjectId(Long projectId) throws NotExistsException {
        List<File> files = fileRepository.findByProjectId(projectId);
        if (files.isEmpty()) {
            throw new NotExistsException("No files found for Project ID " + projectId);
        }
        return files.stream()
                .map(file -> new FileResponseDto(
                        file.getId(),
                        file.getProject().getId(),
                        file.getFileName(),
                        file.getFileType(),
                        file.getUploadedBy().getName()
                ))
                .collect(Collectors.toList());
    }


}