package ubb.project.ubb.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ubb.project.ubb.data.File;
import ubb.project.ubb.dto.file_upload.FileResponseDto;
import ubb.project.ubb.dto.file_upload.UploadFileRequestDto;
import ubb.project.ubb.exception.NotExistsException;
import ubb.project.ubb.service.FileService;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileResponseDto> uploadFile(
            @RequestParam("projectId") Long projectId,
            @RequestParam("uploadedBy") Long uploadedBy,
            @RequestParam("file") MultipartFile file) {
        try {
            UploadFileRequestDto requestDto = new UploadFileRequestDto();
            requestDto.setProjectId(projectId);
            requestDto.setUploadedBy(uploadedBy);
            requestDto.setFile(file);

            FileResponseDto responseDto = fileService.uploadFile(requestDto);
            return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
        } catch (NotExistsException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to download a file by its ID.
     *
     * @param fileId The ID of the file to download.
     * @return ResponseEntity containing the file bytes and HTTP headers.
     */
    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId) {
        try {
            File file = fileService.getFileById(fileId);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + file.getFileName() + "\"")
                    .contentType(org.springframework.http.MediaType.parseMediaType(file.getFileType()))
                    .body(file.getFileContent());
        } catch (NotExistsException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Endpoint to check the health of the file service.
     *
     * @return ResponseEntity with HTTP status OK.
     */
    @GetMapping("/healthcheck")
    public ResponseEntity<?> healthcheck() {
        return ResponseEntity.ok().build();
    }
}
