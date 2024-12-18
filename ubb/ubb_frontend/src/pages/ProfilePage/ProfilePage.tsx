// import { useEffect, useState } from "react";
// // @ts-ignore
// import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
// import "./ProfilePage.css";
// import { Button } from "antd";
// // @ts-ignore
// import { useGetUserByIdQuery } from "../../api/UserApi.ts";
//
// interface UserProfile {
//     id: number;
//     name: string;
//     email: string;
//     password: string; // Typically, passwords should never be displayed; consider displaying masked values.
// }
//
// export default function ProfilePage() {
//     const [editMode, setEditMode] = useState(false);
//
//     // Retrieve the logged-in user's ID from localStorage
//     const userId = parseInt(localStorage.getItem(LocalStorageEnum.USER_ID) || "0", 10);
//
//     // Use the API hook to fetch user details by ID
//     const { data: userProfile, isLoading, error } = useGetUserByIdQuery({ id: userId });
//
//     const [formData, setFormData] = useState<UserProfile | null>(null);
//
//     useEffect(() => {
//         if (userProfile) {
//             // @ts-ignore
//             setFormData(userProfile); // Set form data for editing when userProfile is fetched
//         }
//     }, [userProfile]);
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (formData) {
//             setFormData({ ...formData, [name]: value });
//         }
//     };
//
//     const handleSave = () => {
//         // Add logic to save the updated user data (e.g., via an API call)
//         setEditMode(false);
//     };
//
//     if (isLoading) {
//         return <p>Loading user details...</p>;
//     }
//
//     if (error) {
//         return <p>Error fetching user details.</p>;
//     }
//
//     return (
//         <div className="profile-page">
//             <h1 style={{ textAlign: "center", marginBottom: "0rem", marginTop: "-1rem" }}>
//                 User Profile
//             </h1>
//             <p style={{ textAlign: "center", marginBottom: "0rem" }}>
//                 Here are the details of your account:
//             </p>
//             <p style={{ textAlign: "center", marginBottom: "2rem" }}>
//                 Please note that only the 'Name' field is mutable
//             </p>
//             <div className="profile-info">
//                 {formData ? (
//                     editMode ? (
//                         <>
//                             <p>
//                                 <strong>Name: </strong>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                 />
//                             </p>
//                             <p>
//                                 <strong>Email: </strong>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     readOnly // Email should not be editable
//                                 />
//                             </p>
//                             <p>
//                                 <strong>Password: </strong>
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     readOnly // Password should not be editable
//                                 />
//                             </p>
//                             <Button type="primary" onClick={handleSave}>
//                                 Save
//                             </Button>
//                             <Button onClick={() => setEditMode(false)} style={{ marginLeft: "1rem" }}>
//                                 Cancel
//                             </Button>
//                         </>
//                     ) : (
//                         <>
//                             <p>
//                                 <strong>Name: </strong> {formData.name}
//                             </p>
//                             <p>
//                                 <strong>Email: </strong> {formData.email}
//                             </p>
//                             <p>
//                                 <strong>Password: </strong> {formData.password}
//                             </p>
//                             <Button type="primary" onClick={() => setEditMode(true)}>
//                                 Edit
//                             </Button>
//                         </>
//                     )
//                 ) : (
//                     <p>No user details found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
// @ts-ignore
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import "./ProfilePage.css";
import { Button, message } from "antd";
// @ts-ignore
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../api/UserApi.ts";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    password: string; // Typically, passwords should never be displayed; consider displaying masked values.
}

export default function ProfilePage() {
    const [editMode, setEditMode] = useState(false);

    // Retrieve the logged-in user's ID from localStorage
    const userId = parseInt(localStorage.getItem(LocalStorageEnum.USER_ID) || "0", 10);

    // Use the API hook to fetch user details by ID
    const { data: userProfile, isLoading, error } = useGetUserByIdQuery({ id: userId });

    // Use the API hook to update user details
    const [updateUser] = useUpdateUserMutation();

    const [formData, setFormData] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (userProfile) {
            // @ts-ignore
            setFormData(userProfile);
        }
    }, [userProfile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (formData) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const { refetch } = useGetUserByIdQuery({ id: userId });

    const handleSave = async () => {
        if (formData) {
            try {
                await updateUser(formData).unwrap();
                message.success("User updated successfully!");
                await refetch(); // Refetch the user data
                setEditMode(false);
            } catch (err) {
                console.error("Failed to update user:", err);
                message.error("Failed to update user. Please try again.");
            }
        }
    };


    if (isLoading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p>Error fetching user details.</p>;
    }

    return (
        <div className="profile-page">
            <div className="profile-info">
                <h1 style={{textAlign: "center", marginBottom: "1rem"}}>Account Details</h1>
                <p style={{textAlign: "center", marginBottom: "2rem"}}>
                    In the following you will see the details of your account. Please note that the email and password can not be reset.
                </p>
                {formData ? (
                    editMode ? (
                        <>
                            <p>
                                <strong>Name: </strong>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <p>
                                <strong>Password: </strong>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </p>
                            <Button type="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button onClick={() => setEditMode(false)} style={{marginLeft: "1rem"}}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <>
                            <p>
                                <strong>Name: </strong> {formData.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {formData.email}
                            </p>
                            <p>
                                <strong>Password: </strong> {formData.password}
                            </p>
                            <Button type="primary" onClick={() => setEditMode(true)}>
                                Edit
                            </Button>
                        </>
                    )
                ) : (
                    <p>No user details found.</p>
                )}
            </div>
        </div>
    );
}
