import { useEffect, useState } from "react";

import { useNavigate, Outlet } from "react-router-dom";



export default function Layout() {
  const [username, setUsername] = useState<string>(" ");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem(localStorage.USER_NAME);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(localStorage.USER_NAME);
    navigate("/login");
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">ITSM Tool</div>
        <ul className="nav-links">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/projects")}>Projects</li>
          <li onClick={() => navigate("/tickets")}>Tickets</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li onClick={() => navigate("/invite")}>Invite</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet /> {/* Render child components here */}
      </main>
    </div>
  );
}
