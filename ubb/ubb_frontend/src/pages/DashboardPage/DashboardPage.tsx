import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import FileUpload from "../../components/ProjectFiles/FileUpload.tsx";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import FileList from "../../components/ProjectFiles/FileList.tsx";

export default function DashboardPage() {
  const [username, setUsername] = useState<string>(" ");

  useEffect(() => {
    const storedUsername = localStorage.getItem(LocalStorageEnum.USER_NAME);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Welcome to the Dashboard, {username}!</h1>
      <div className="upload-section">
        <h2>Upload Files</h2>
        <FileUpload />
      </div>
      <div className="files-section-container">
        <FileList />
      </div>
    </div>
  );
}