import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { useFetchFilesByProjectQuery } from "../../api/FileApi.ts";

interface FileListProps {
  projectId: number;
}

const FileList: React.FC<FileListProps> = ({ projectId }) => {
  const {
    data: files,
    isLoading,
    isError,
    refetch,
  } = useFetchFilesByProjectQuery(projectId, {
    skip: projectId === 0, // Skip query if projectId is not set
  });

  return (
    <div className="files-section">
      <h2>Project Files</h2>
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
      <Button type="primary" onClick={() => refetch()}>Refresh Files</Button>
    </div>
  );
};

export default FileList;
