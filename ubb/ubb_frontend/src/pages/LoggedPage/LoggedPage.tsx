import { useEffect, useState } from "react";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import { useNavigate } from "react-router-dom";
import "./LoggedPage.css";

export default function LoggedPage() {
  const [username, setUsername] = useState<string>(" ");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(LocalStorageEnum.USER_NAME)) {
      setUsername(localStorage.getItem(LocalStorageEnum.USER_NAME)!);
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
            <h1>Welcome, {username}!</h1>
            <p>
              You're logged in! Here you can explore your projects, manage tickets, and stay productive.
            </p>
          </div>
          <div className="features-section">
            <div className="feature-card">
              <img src="/images/projects.jpg" alt="Projects" />
              <h2>Manage Projects</h2>
              <p>Create, track, and collaborate on projects with your team.</p>
            </div>
            <div className="feature-card">
              <img src="/images/tickets.jpg" alt="Bug Tracking" />
              <h2>Bug Tracking</h2>
              <p>Assign, resolve, and monitor bugs in your projects efficiently.</p>
            </div>
            <div className="feature-card">
              <img src="/images/files.jpg" alt="Files" />
              <h2>File Management</h2>
              <p>Upload and organize project files, contracts, and documentation.</p>
            </div>
          </div>
        </main>
      </div>
  );
}
