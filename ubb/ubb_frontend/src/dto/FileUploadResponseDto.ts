export interface FileUploadResponseDto {
    id: number; // The unique ID of the uploaded file
    projectId: number; // The ID of the associated project
    fileName: string; // The name of the uploaded file
    fileType: string; // The MIME type of the uploaded file
  }
  