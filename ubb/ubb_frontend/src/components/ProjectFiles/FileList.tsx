import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import { FileUploadResponseDto } from "../../dto/FileUploadResponseDto";
import { useFetchFilesByProjectQuery } from "../../api/FileApi.ts";
import "./FileList.css";

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

  // State for Modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] =
    useState<FileUploadResponseDto | null>(null);

  const handleRowClick = (file: FileUploadResponseDto) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
  };

  return (
    <div className="files-section">
      {isLoading && <p>Loading files...</p>}
      {isError && <p>Error fetching files.</p>}
      {files && files.length > 0 ? (
        <table className="table-container">
          <thead>
            <tr>
              <td>ID</td>
              <td>File Name</td>
              <td>File Type</td>
              <td>Uploaded By</td>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr
                key={file.id}
                onClick={() => handleRowClick(file)}
                style={{ cursor: "pointer" }}
              >
                <td>{file.id}</td>
                <td>
                  <a
                    href={`http://localhost:8080/files/download/${file.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Prevent row click when clicking the link
                  >
                    {file.fileName}
                  </a>
                </td>
                <td>{file.fileType}</td>
                <td>{file.uploadedByName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        projectId !== 0 && <p>No files found for this project.</p>
      )}

      {/* Modal to Display File Details */}
      <Modal
        title={`File Details: ${selectedFile?.fileName || ""}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // Remove default footer buttons
      >
        {selectedFile && (
          <div>
            <p>
              <strong>ID:</strong> {selectedFile.id}
            </p>
            <p>
              <strong>Project ID:</strong> {selectedFile.projectId}
            </p>
            <p>
              <strong>File Name:</strong> {selectedFile.fileName}
            </p>
            <p>
              <strong>File Type:</strong> {selectedFile.fileType}
            </p>
            <p>
              <strong>Uploaded By:</strong> {selectedFile.uploadedByName}
            </p>
            {/* Add more details if necessary */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FileList;
