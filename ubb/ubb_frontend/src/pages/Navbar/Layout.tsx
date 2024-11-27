import { useEffect, useState } from "react";
import {
  BellOutlined, LogoutOutlined, UserOutlined
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import './Layout.css'


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
    navigate("/");
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/logged")}>
          <h2>ITSM Tool</h2>
        </div>
        <ul className="nav-links">
        <li onClick={() => navigate("/logged")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/projects")}>Projects</li>
          <li onClick={() => navigate("/tickets")}>Tickets</li>
          <li onClick={() => navigate("/invite")}>Invite</li>
          
          <li>
            <UserOutlined className="icon" onClick={() => navigate("/profile")}/>
          </li>

          <li onClick={() => navigate("/invite")}>
            {/*<UserOutlined className="icon" onClick={() => navigate("/profile")}/>*/}
            <BellOutlined className="icon" onClick={() => navigate("/invite")}/>
            {/*<LogoutOutlined className="icon" onClick={handleLogout()}/> */}
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet/> {/* Render child components here */}
      </main>
    </div>
  );
}
