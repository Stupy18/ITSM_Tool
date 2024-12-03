import React, { useState } from "react";
import { useUploadFileMutation } from "../../../api/FileApi.ts";
import { FileUploadRequestDto } from "../../../dto/FileUploadRequestDto.ts";

const FileUpload = () => {
  const [projectId, setProjectId] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading, isSuccess, isError }] = useUploadFileMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const request: FileUploadRequestDto = { projectId, file };
      try {
        const response = await uploadFile(request).unwrap();
        console.log("File uploaded successfully", response);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input
        type="number"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(Number(e.target.value))}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {isSuccess && <p>File uploaded successfully!</p>}
      {isError && <p>There was an error uploading the file.</p>}
    </div>
  );
};

export default FileUpload;
