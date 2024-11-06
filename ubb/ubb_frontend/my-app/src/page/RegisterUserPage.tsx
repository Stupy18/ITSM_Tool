import { Button, Form, Input } from "antd";
import { useRegisterMutation } from "../api/UserApi.ts";
import { UserRegistrationDto } from "../dto/UserRegistrationDto.ts";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

interface RegistrationFormItems {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [form] = Form.useForm();
  const [registerUser, { isError, isLoading, isSuccess, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleOnSubmit = (formItems: RegistrationFormItems) => {
    const newUser: UserRegistrationDto = {
      name: formItems.name,
      email: formItems.email,
      password: formItems.password,
    };

    registerUser({ userRequest: newUser })
      .unwrap()
      .then(()=>{
        // might want to do auto-login
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  const errorMessage = error && 'data' in error && (error.data as { message?: string }).message;

  return (
    <Form
      id="registerForm"
      layout="vertical"
      form={form}
      onFinish={handleOnSubmit}
      className="register-form"
    >
      <Form.Item label="Name" name="name" 
       rules={[{ required: true, message: "You must specify a name" }]}>
        <Input prefix={<UserOutlined />} className="form-input" />
      </Form.Item>

      <Form.Item label="Email" name="email"
       rules={[{ required: true, message: "You must specify an e-mail address" }]}>
        <Input prefix={<MailOutlined />} className="form-input" />
      </Form.Item>

      <Form.Item label="Password" name="password"
       rules={[{ required: true, message: "You must specify a password" }]}>
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
        form="registerForm"
        type="primary"
        className="flat-button"
      >
        {isLoading ? <LoadingOutlined /> : <span>Register</span>}
      </Button>

      {isSuccess && <p>Registration successful!</p>}
      {isError && <p>{errorMessage || "Registration failed."}</p>}
    </Form>
  );
}
