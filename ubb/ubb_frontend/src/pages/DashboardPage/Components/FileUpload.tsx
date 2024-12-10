import React, { useState } from "react";
import { useUploadFileMutation } from "../../../api/FileApi.ts";
import { FileUploadRequestDto } from "../../../dto/FileUploadRequestDto";

const FileUpload = () => {
  const [projectId, setProjectId] = useState<number>(0);
  const [uploadedBy, setUploadedBy] = useState<number>(0); // You might derive this from auth context
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile, { isLoading, isSuccess, isError }] = useUploadFileMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const request: FileUploadRequestDto = { projectId, uploadedBy, file };
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
      <input
        type="number"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Uploaded By (User ID)"
        value={uploadedBy}
        onChange={(e) => setUploadedBy(Number(e.target.value))}
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
