import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { useUploadFileMutation } from "../../api/FileApi.ts";
import { FileUploadRequestDto } from "../../dto/FileUploadRequestDto.ts";

interface FileUploadProps {
  projectId: number;
  userId: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ projectId, userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading, isSuccess, isError }] =
    useUploadFileMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const request: FileUploadRequestDto = { projectId, uploadedBy: userId, file };
      try {
        const response = await uploadFile(request).unwrap();
        console.log("File uploaded successfully", response);
        // Optionally refetch the file list or show a success message
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <Button type="primary" onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </Button>
      {isSuccess && <p>File uploaded successfully!</p>}
      {isError && <p>There was an error uploading the file.</p>}
    </div>
  );
};

export default FileUpload;
