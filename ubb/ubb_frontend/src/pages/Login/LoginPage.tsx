import { useState } from "react";
import { LocalStorageEnum } from "../../enum/LocalStorageEnum.tsx";
import { Button, Form, Input, Alert } from "antd";
import { useLoginMutation } from "../../api/UserApi.ts";
import { LoginResponseDto } from "../../dto/LoginResponseDto.ts";
import { LoginRequestDto } from "../../dto/LoginRequestDto.ts";
import {
    EyeInvisibleOutlined,
    EyeOutlined,
    LoadingOutlined,
    LockOutlined,
    UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

interface FormItemIndexes {
    email: string;
    password: string;
}

export default function Login() {
    const [form] = Form.useForm();
    const [loginUser, { isError, data, isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    const handleOnSubmit = (formItems: FormItemIndexes) => {
        setShowError(false);
        const user: LoginRequestDto = {
            email: formItems.email,
            password: formItems.password,
        };

        loginUser({ userRequest: user })
            .unwrap()
            .then((data) => {
                const decoded: LoginResponseDto = jwtDecode(data.jwt);

                console.log('Decoded JWT:', decoded);

                localStorage.setItem(LocalStorageEnum.JWT_TOKEN, data.jwt);
                localStorage.setItem(LocalStorageEnum.USER_NAME, JSON.stringify(decoded.user));
                localStorage.setItem(LocalStorageEnum.USER_ID, decoded.sub);

                navigate("/logged");
            })
            .catch((error) => {
                console.log(error);
                setShowError(true);
                form.setFields([
                    {
                        name: 'password',
                        value: '',
                    },
                ]);

                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            });
    };

    return(
        <div className="login-root">
            <div className="box-root flex-flex flex-direction--column" style={{ minHeight: '100vh', flexGrow: 1 }}>
                <div className="loginbackground box-background--white padding-top--64">
                    <div className="loginbackground-gridContainer">
                        <div className="box-root flex-flex" style={{ gridArea: 'top / start / 8 / end' }}>
                            <div
                                className="box-root"
                                style={{
                                    backgroundImage: 'linear-gradient(white 0%, rgb(247, 250, 252) 33%)',
                                    flexGrow: 1
                                }}
                            />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '4 / 2 / auto / 5' }}>
                            <div
                                className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                                style={{ flexGrow: 1 }}
                            />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '6 / start / auto / 2' }}>
                            <div className="box-root box-background--blue800" style={{ flexGrow: 1 }} />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '7 / start / auto / 4' }}>
                            <div className="box-root box-background--blue animationLeftRight" style={{ flexGrow: 1 }} />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '8 / 4 / auto / 6' }}>
                            <div
                                className="box-root box-background--gray100 animationLeftRight tans3s"
                                style={{ flexGrow: 1 }}
                            />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '2 / 15 / auto / end' }}>
                            <div
                                className="box-root box-background--cyan200 animationRightLeft tans4s"
                                style={{ flexGrow: 1 }}
                            />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '3 / 14 / auto / end' }}>
                            <div className="box-root box-background--blue animationRightLeft" style={{ flexGrow: 1 }} />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '4 / 17 / auto / 20' }}>
                            <div
                                className="box-root box-background--gray100 animationRightLeft tans4s"
                                style={{ flexGrow: 1 }}
                            />
                        </div>

                        <div className="box-root flex-flex" style={{ gridArea: '5 / 14 / auto / 17' }}>
                            <div
                                className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                                style={{ flexGrow: 1 }}
                            />
                        </div>
                    </div>
                </div>

                <h1 className="title">Welcome to your ITSM Tool</h1>

                {showError && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1000,
                        width: '90%',
                        maxWidth: '500px'
                    }}>
                        <Alert
                            message="Error"
                            description="Invalid email or password. Please try again."
                            type="error"
                            showIcon
                            closable
                            onClose={() => setShowError(false)}
                        />
                    </div>
                )}

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
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            className="form-input"
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            className="form-input"
                            placeholder="Enter your password"
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
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? <LoadingOutlined /> : <span>Continue</span>}
                    </Button>
                    <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </Form>
            </div>
        </div>
    );
}