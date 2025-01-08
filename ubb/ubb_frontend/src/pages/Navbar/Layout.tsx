import { useEffect, useState } from "react";
import {
  BellOutlined, LogoutOutlined, MailOutlined, UserOutlined
} from "@ant-design/icons";
import { useNavigate, Outlet } from "react-router-dom";
import './Layout.css';
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import { Modal, Button } from "antd";

export default function Layout() {
  const [username, setUsername] = useState<string>(" ");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem(LocalStorageEnum.USER_NAME);
    if (storedUsername) {
      setUsername(JSON.parse(storedUsername));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Logout Confirmation',
      content: 'Are you sure you want to log out of your account?',
      okText: 'Logout',
      cancelText: 'Cancel',
      centered: true,
      icon: <LogoutOutlined style={{ color: '#ff4d4f' }} />,
      okButtonProps: {
        danger: true,
        size: 'large'
      },
      cancelButtonProps: {
        size: 'large'
      },
      className: 'custom-modal',
      onOk: () => {
        localStorage.removeItem(LocalStorageEnum.USER_NAME);
        localStorage.removeItem(LocalStorageEnum.USER_ID);
        localStorage.removeItem(LocalStorageEnum.JWT_TOKEN);
        setUsername(" ");
        navigate("/");
      }
    });
  };

  return (
      <div className="layout">
        <nav className="navbar">
          <div className="navbar-brand" onClick={() => navigate("/logged")}>
            <h2>ITSM Tool</h2>
          </div>
          <ul className="nav-links">
            <li onClick={() => navigate("/logged")}>Home</li>
            <li onClick={() => navigate("/projects")}>Projects</li>
            <li onClick={() => navigate("/tickets")}>Tickets</li>

            <li>
              <UserOutlined className="icon" onClick={() => navigate("/profile")}/>
            </li>

            <li>
              <MailOutlined className="icon" onClick={() => navigate("/invite")}/>
            </li>

            <li>
              <LogoutOutlined className="icon logout-icon" onClick={handleLogout} />
            </li>
          </ul>
        </nav>
        <main className="main-content">
          <Outlet/>
        </main>
      </div>
  );
}
