import { useEffect, useState } from "react";
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";
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
        <h1>Welcome, {username}!</h1>
        <p>
          You're logged in. Here you can access your projects, tickets, and
          settings.
        </p>
      </main>
    </div>
  );
}
