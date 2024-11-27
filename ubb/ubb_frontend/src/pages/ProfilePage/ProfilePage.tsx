import { useEffect, useState } from "react";
// @ts-ignore
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import "./ProfilePage.css";
import { Button } from 'antd';

interface UserProfile {
    name: string;
    email: string;
    password: string; // Typically, passwords should never be displayed, so consider displaying masked or hashed values if necessary.
}

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Mock data to simulate fetching user details (you would replace this with an API call)
        const mockUserProfile: UserProfile = {
            name: localStorage.getItem(LocalStorageEnum.USER_NAME) || "",
            email: "user@example.com", // Replace with real data fetched from an API
            password: "********" // Masked password for display purposes
        };
        setUserProfile(mockUserProfile);
    }, []);

    return (
        <div className="profile-page">
            <h1 style={{textAlign: 'center', marginBottom: '0rem', marginTop: '-1rem'}}>User Profile</h1>
            <p style={{textAlign: 'center', marginBottom: '0rem'}}>Here are the details of your account:</p>
            <p style={{textAlign: 'center', marginBottom: '2rem'}}>Please note that only the 'Name' field is mutable</p>
            <div className="profile-info">
                {userProfile ? (
                    <>
                        <p>
                            <strong>Name: </strong> {userProfile.name}
                        </p>
                        <p>
                            <strong>Email: </strong> {userProfile.email}
                        </p>
                        <p>
                            <strong>Password: </strong> {userProfile.password}
                        </p>
                        <Button type="primary" style={{ marginTop: '1rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Edit Data</Button>
                    </>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    );
}

