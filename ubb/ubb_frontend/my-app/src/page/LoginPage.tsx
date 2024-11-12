import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

interface FormItemIndexes {
    email: string;
    password: string;
}

export default function Login() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleOnSubmit = (formItems: FormItemIndexes) => {
        const user = {
            email: formItems.email,
            password: formItems.password,
        };

        setIsLoading(true);

        // Fetch request to login endpoint
        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Login failed");
                }
                return response.json();
            })
            .then(data => {

                // console.log()
                if (!data.jwt) {
                    throw new Error("Token is missing in the response");
                }

                const decodedToken = jwtDecode(data.jwt);

                // Store token and user data in local storage
                localStorage.setItem("TOKEN", data.jwt);


                // Navigate to the logged-in page
                navigate("/logged");
            })
            .catch(error => {
                console.error("Error:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Form
            id="loginForm"
            layout="vertical"
            form={form}
            onFinish={handleOnSubmit}
            className="login-form"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input prefix={<UserOutlined />} className="form-input" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    className="form-input"
                    iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                />
            </Form.Item>
            <Button
                key="submit"
                htmlType="submit"
                form="loginForm"
                type="primary"
                className="flat-button"
                disabled={isLoading}
            >
                {isLoading ? <LoadingOutlined /> : <span>Login</span>}
            </Button>
            <p>
                Don't have an account? <a href="/register">Register.</a>
            </p>
        </Form>
    );
}
