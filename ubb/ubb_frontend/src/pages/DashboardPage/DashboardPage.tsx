import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import { useFetchFilesByProjectQuery } from "../../api/FileApi.ts";
import FileUpload from "../DashboardPage/Components/FileUpload.tsx";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";

export default function DashboardPage() {
  const [username, setUsername] = useState<string>(" ");
  const [projectId, setProjectId] = useState<number>(0); // Initialize as needed
  const navigate = useNavigate();

  const { data: files, isLoading, isError, refetch } = useFetchFilesByProjectQuery(projectId, {
    skip: projectId === 0, // Skip query if projectId is not set
  });

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem(LocalStorageEnum.USER_NAME);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageEnum.USER_NAME);
    navigate("/login");
  };

  const handleProjectIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(Number(e.target.value));
    // Optionally, you can refetch manually or rely on RTK Query's reactivity
  };

  return (
    <div className="dashboard-page">
      <h1>Welcome to the Dashboard, {username}!</h1>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="upload-section">
        <h2>Upload Files</h2>
        <FileUpload />
      </div>
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
        <button onClick={handleRefetch}>Refresh Files</button>
      </div>
    </div>
  );
}
