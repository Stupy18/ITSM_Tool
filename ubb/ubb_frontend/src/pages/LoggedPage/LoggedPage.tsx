import { useEffect, useState } from "react";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import { useNavigate } from "react-router-dom";
import "./LoggedPage.css";
import React from "react";

export default function LoggedPage() {
  const [username, setUsername] = useState<string>("");
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
    <div className="logged-page">
      <main className="landing-content">
        <div className="welcome-section">
          <h1>Welcome, {username || 'User'}!</h1>
          <p>
            You're now logged in. Dive into your workspace, manage projects, 
            track progress, and collaborate seamlessly with your team.
          </p>
        </div>
        <div className="features-section">
          <div className="feature-card">
            <img src="/images/projects.jpg" alt="Projects" />
            <h2>Manage Projects</h2>
            <p>Streamline project workflows, assign tasks, and track progress with intuitive tools.</p>
          </div>
          <div className="feature-card">
            <img src="/images/tickets.jpg" alt="Bug Tracking" />
            <h2>Bug Tracking</h2>
            <p>Efficiently identify, prioritize, and resolve issues to maintain software quality.</p>
          </div>
          <div className="feature-card">
            <img src="/images/files.jpg" alt="Files" />
            <h2>File Management</h2>
            <p>Securely store, organize, and share project documents and resources.</p>
          </div>
        </div>
      </main>
    </div>
  );
}