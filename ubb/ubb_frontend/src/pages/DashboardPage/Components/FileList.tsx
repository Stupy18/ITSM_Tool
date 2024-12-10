import React, { useState } from "react";
import { useFetchFilesByProjectQuery } from "../../../api/FileApi.ts";
import { FileUploadResponseDto } from "../../../dto/FileUploadResponseDto";

const FileList: React.FC = () => {
  const [projectId, setProjectId] = useState<number>(0);
  const { data: files, isLoading, isError, refetch } = useFetchFilesByProjectQuery(projectId, {
    skip: projectId === 0, // Skip query if projectId is not set
  });

  const handleProjectIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(Number(e.target.value));
    // RTK Query will automatically refetch based on projectId change
  };

  return (
    <div className="files-section">
      <h2>Project Files</h2>
      <input
        type="number"
        placeholder="Enter Project ID"
        value={projectId}
        onChange={handleProjectIdChange}
      />
      {isLoading && <p>Loading files...</p>}
      {isError && <p>Error fetching files.</p>}
      {files && files.length > 0 ? (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              <a
                href={`http://localhost:8080/files/download/${file.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.fileName}
              </a>{" "}
              ({file.fileType}) - Uploaded by: {file.uploadedByName}
            </li>
          ))}
        </ul>
      ) : (
        projectId !== 0 && <p>No files found for this project.</p>
      )}
      <button onClick={() => refetch()}>Refresh Files</button>
    </div>
  );
};

export default FileList;
