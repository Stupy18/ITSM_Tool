import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";
import { useEffect, useState } from "react";
// @ts-ignore
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import FileUpload from "../DashboardPage/Components/FileUpload.tsx"; // Adjust the path as necessary

export default function DashboardPage() {
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
        <div className="dashboard-page">
            <h1>Welcome to the Dashboard, {username}!</h1>
            <p>Upload files using the form below:</p>
            <FileUpload />
        </div>
    );
}
