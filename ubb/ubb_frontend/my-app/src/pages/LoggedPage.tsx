import { useEffect, useState } from "react";
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";
import {useNavigate} from "react-router-dom";
import "./LoggedPage.css"


export default function LoggedPage(){


    const [username, setUsername] = useState<String>(" ")
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem(LocalStorageEnum.USER_NAME))
            setUsername(localStorage.getItem(LocalStorageEnum.USER_NAME)!)
    },[localStorage.getItem(LocalStorageEnum.USER_NAME)])

    const handleLogout = () => {
        localStorage.removeItem(LocalStorageEnum.USER_NAME);
        navigate("/login")
    }

    return(
        <div className="logged-page">
            <nav className="navbar">
                <div className="navbar-brand"> ITSM Tool</div>
                <ul className="nav-links">
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    <li onClick={() => navigate("/projects")}>Projects</li>
                    <li onClick={() => navigate("/tickets")}>Tickets</li>
                    <li onClick={() => navigate("/settings")}>Settings</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </nav>

            <main className = "landing-content">
                <h1>Welcome, {username}!</h1>
                <p>You're logged in. Here you can access your projects, tickets, and settings.</p>
            </main>

        </div>
    );
}