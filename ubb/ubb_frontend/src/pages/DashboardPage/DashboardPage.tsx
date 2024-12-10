import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import FileUpload from "../DashboardPage/Components/FileUpload.tsx";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import FileList from "../DashboardPage/Components/FileList.tsx";

export default function DashboardPage() {
  const [username, setUsername] = useState<string>(" ");
  const navigate = useNavigate();

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
      <div className="files-section-container">
        <FileList />
      </div>
    </div>
  );
}